<?php

namespace App\Services;

use App\Models\ElementPassedUser;
use App\Models\Parade;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CalculateParadeValuesService
{

    protected UserParadeService $userParadeService;

    public function __construct(UserParadeService $userParadeService)
    {
        $this->userParadeService = $userParadeService;
    }

    public function updateParadeComputedValues($paradeId)
    {
        $parade = $this->userParadeService->find($paradeId);

        // set parade speed
        $parade->speed = $this->calcParadeSpeed($parade);


        $blocks = $parade->blocks;

        $paradePeopleCount = 0;
        $paradeElementsLength = 0;
        $paradeTotalDuration = 0;

        foreach ($blocks as $block) {
            $blockPeopleCount = 0;
            $blockLength = 0;

            foreach ($block->elements as $element) {
                $blockPeopleCount += $element->people_count;
                $blockLength += $element->length;

                // set element duration in seconds
                $element->duration = ($element->length / $parade->speed) * 60;
                $element->save();
            }

            $blockDuration = $blockLength / $parade->speed;

            $block->people_count = $blockPeopleCount;
            $block->length = $blockLength;
            $block->duration = $blockDuration;

            $block->save();

            $paradePeopleCount += $blockPeopleCount;
            $paradeElementsLength += $blockLength;
            $paradeTotalDuration += $blockDuration;
        }

        $parade->people_count = $paradePeopleCount;
        $parade->elements_length = $paradeElementsLength;
        $parade->total_duration = $parade->duration + $paradeTotalDuration;

        $parade->save();
    }

    /**
     * Calculate parade speed in mt/min
     *
     * @param Parade $parade
     * @return float
     */
    public function calcParadeSpeed(Parade $parade): float
    {
        return $parade->distance / $parade->duration;
    }

    // Todos se comparan con el primero
    public function getParadeDataForCalculations($paradeId, $elementId = null, bool $onlyElementsPassed = false): array
    {

        $dataWhere = "parade_id = :parade_id";
        $dataParams = ['parade_id' => $paradeId];

        if (!is_null($elementId)) {
            $dataWhere .= " AND e.id = :element_id";
            $dataParams['element_id'] = $elementId;
        }

        $data = DB::select("
            SELECT 
                e.name AS element,
                e.duration,
                u.name AS user,
                epu.element_id AS element_id,
                epu.user_id AS user_id,
                epu.created_at AS passed_at
            FROM elements e
            INNER JOIN blocks b ON b.id = e.block_id
            INNER JOIN parades p ON p.id = b.parade_id
            LEFT JOIN element_passed_user epu ON e.id = epu.element_id AND inferred = FALSE
            RIGHT JOIN users u ON u.id = epu.user_id 
            WHERE $dataWhere
            ORDER BY passed_at asc
        ",  $dataParams);

        $elementsWhere = "parade_id = :parade_id";
        $elementsParams = ['parade_id' => $paradeId];

        if (!is_null($elementId)) {
            $elementsWhere .= " AND e.id = :element_id";
            $elementsParams['element_id'] = $elementId;
        } else if ($onlyElementsPassed) {

            // if there is no data return empty arrays
            if (count($data) == 0)
                return [
                    'data' => [],
                    'elements' => []
                ];

            $elementsId = array_unique(
                array_map(function ($element) {
                    return $element->element_id;
                }, $data)
            );

            $elementsId = implode(",", $elementsId);
            $elementsWhere .= " AND e.id IN ($elementsId)";
        }

        $elements = DB::select("
            SELECT 
                e.name AS element,
                e.id AS element_id,
                e.duration,
                e.order as in_block_order,
                b.name as block,
                b.id as block_id
            FROM elements e
            INNER JOIN blocks b ON b.id = e.block_id
            INNER JOIN parades p ON p.id = 3
            WHERE $elementsWhere
            ORDER BY b.order asc, e.order asc
        ", $elementsParams);

        return compact('data', 'elements');
    }

    /*+ Calculate relative distance for each user
        * 
        
        * @param int $paradeId
        * @return array
    */
    public function distance($paradeId, $elementId, bool $withCalculationData = false, bool $onlyElementsPassed = false)
    {
        $dataForCalculations = $this->getParadeDataForCalculations($paradeId, $elementId, $onlyElementsPassed);
        $calculationsData = $this->getControlCalculationData($dataForCalculations);
        // return $calculationsData;
        $isThereData = count($calculationsData['elements']) > 0 && count($calculationsData['users']) > 0;

        if (count($calculationsData['elements']) == 0) {
            return compact('isThereData');
        }

        $distanceFromPrevious = [];
        $distanceFromFirst = [];
        $elementsPassedAt = [];

        $firstElement = $calculationsData['elements'][0];

        foreach ($calculationsData['elements'] as $index => $element) {

            if ($index == 0) {
                $previousElement = $element;
            } else
                $previousElement = $calculationsData['elements'][$index - 1];

            $distanceFromFirst[$element["id"]] = [];
            $distanceFromPrevious[$element["id"]] = [];
            $elementsPassedAt[$element["id"]] =  $element["passedUsersAt"];

            foreach ($calculationsData['users'] as $userId => $user) {

                // distance from first
                if (isset($user["elements"][$element["id"]]) && isset($user["elements"][$firstElement['id']])) {


                    $duration = $this->calcDifferenceInSeconds(
                        $user["elements"][$element["id"]],
                        $user["elements"][$firstElement['id']]
                    );

                    $distanceFromFirst[$element["id"]][$userId] =  [
                        'duration' => $duration,
                        'delay' => $duration - $element['accumulated_duration'],
                        'on_time' => $duration <= $element['accumulated_duration'] || $index == 0
                    ];
                } else {
                    $distanceFromFirst[$element["id"]][$userId]  =  null;
                }

                // distance from previous
                if (isset($user["elements"][$element["id"]]) && isset($user["elements"][$previousElement['id']])) {
                    $duration =  $this->calcDifferenceInSeconds(
                        $user["elements"][$element["id"]],
                        $user["elements"][$previousElement['id']]
                    );
                    $distanceFromPrevious[$element["id"]][$userId] = [
                        'duration' => $duration,
                        'delay' => $duration - $element['duration'],
                        'on_time' => $duration <= $element['duration'] || $index == 0
                    ];
                } else {
                    $distanceFromPrevious[$element["id"]][$userId]  =  null;
                }
            }
        }

        $entities = $this->getElementsAndUsersData($dataForCalculations);

        if ($withCalculationData) {
            return compact(
                'distanceFromFirst',
                'distanceFromPrevious',
                'elementsPassedAt',
                'entities',
                'isThereData',
                'calculationsData',
                'dataForCalculations'
            );
        }

        return compact(
            'distanceFromFirst',
            'distanceFromPrevious',
            'entities',
            'isThereData'
        );
    }

    /*+ Calculate relative distance for each user
        * 
        
        * @param int $paradeId
        * @return array
    */
    public function elementsPosition($paradeId): array
    {

        $parade = Parade::find($paradeId);

        $paradeControlData = $this->distance($paradeId, null, true, true);

        if ($paradeControlData['isThereData'] == false)
            return [
                'parade' => $parade,
                'isThereData' => false,
                'elements' => [],
            ];

        $lastElemensPassedRegister = $this->getLastElemensPassedRegister($paradeControlData['dataForCalculations']['data']);

        $elementsEntities = $paradeControlData['entities']['elements'];

        $elementsData = $this->relateElementsWithControlData(
            $elementsEntities,
            $lastElemensPassedRegister,
            $paradeControlData['distanceFromFirst'],
            $paradeControlData['distanceFromPrevious']
        );

        return [
            'parade' => $parade,
            'isThereData' => true,
            'elements' => $elementsData,
        ];
    }

    /*+ Calculate relative distance for each user
        * 
        
        * @param int $paradeId
        * @return array
    */
    public function elementsAnalisys(int $paradeId, int $elementId = null): array
    {

        $parade = Parade::find($paradeId);

        $paradeControlData = $this->distance($paradeId, $elementId, true, true);
        if ($paradeControlData['isThereData'] == false)
            return [
                'parade' => $parade,
                'isThereData' => false,
                'elements' => [],
            ];

        $lastElemensPassedRegister = $this->getLastElemensPassedRegister($paradeControlData['dataForCalculations']['data']);

        $elementsEntities = $paradeControlData['entities']['elements'];

        $elementsData = $this->relateElementsWithControlDataForAnalisys(
            $elementsEntities,
            $lastElemensPassedRegister,
            $paradeControlData['distanceFromFirst'],
            $paradeControlData['distanceFromPrevious'],
            $paradeControlData['elementsPassedAt'],
            !is_null($elementId)
        );

        if (!is_null($elementId))
            return $elementsData;

        $users = [];

        foreach ($paradeControlData['entities']['users'] as $userId => $user) {
            $users[$userId] = $user['name'];
        }
        return [
            'parade' => $parade,
            'isThereData' => true,
            'elements' => $elementsData,
            'users' => $users,
        ];
    }


    /**
     * Get the las register of element passed by each element
     *
     * @param array $rows
     * @return array
     */
    public function getLastElemensPassedRegister($rows)
    {
        $elementsLastPassedRow = [];
        foreach ($rows as $row) {
            if (!isset($elementsLastPassedRow[$row->element_id])) {
                $elementsLastPassedRow[$row->element_id] = $row;
            } else {
                if ($row->passed_at > $elementsLastPassedRow[$row->element_id]->passed_at) {
                    $elementsLastPassedRow[$row->element_id] = $row;
                }
            }
        }

        return $elementsLastPassedRow;
    }

    public function relateElementsWithControlData(
        array $elementsEntities,
        array $lastElemensPassedRegister,
        array $distanceFromFirst,
        array $distanceFromPrevious,
    ): array {

        $elementIndex = 0;

        $elementsData = array_map(function (
            $elementId,
        ) use (
            $elementsEntities,
            $lastElemensPassedRegister,
            $distanceFromFirst,
            $distanceFromPrevious,
            &$elementIndex
        ) {
            $elementIndex++;
            return [
                'id' => $elementId,
                'name' => $elementsEntities[$elementId]['name'],
                'block' => $elementsEntities[$elementId]['block'],
                'duration' => $elementsEntities[$elementId]['duration'],
                'accumulated_duration' => $elementsEntities[$elementId]['accumulated_duration'],
                'passed_at' => $lastElemensPassedRegister[$elementId]->passed_at,
                'order' => $elementIndex,
                'in_block_order' => $elementsEntities[$elementId]['in_block_order'],
                'user' => $lastElemensPassedRegister[$elementId]->user,
                'user_id' => $lastElemensPassedRegister[$elementId]->user_id,
                'distance_from_first' => $distanceFromFirst[$elementId][$lastElemensPassedRegister[$elementId]->user_id],
                'distance_from_previous' => $distanceFromPrevious[$elementId][$lastElemensPassedRegister[$elementId]->user_id]
            ];
        }, array_keys($elementsEntities));

        usort($elementsData, function ($a, $b) {
            return $b["order"] <=> $a["order"]; // Ordena por edad de menor a mayor
        });

        return $elementsData;
    }

    /**
     * Relate elements with control data for analisy
     *
     * @param array $elementsEntities
     * @param array $lastElemensPassedRegister
     * @param array $distanceFromFirst
     * @param array $distanceFromPrevious
     * @param array $elementsPassedAt
     * @param bool $firstPoles
     * @return array
     */
    public function relateElementsWithControlDataForAnalisys(
        array $elementsEntities,
        array $lastElemensPassedRegister,
        array $distanceFromFirst,
        array $distanceFromPrevious,
        array $elementsPassedAt,
        bool $firstPoles = false
    ): array {

        $elementIndex = 0;

        $elementsData = array_map(function (
            $elementId,
        ) use (
            $elementsEntities,
            $lastElemensPassedRegister,
            $distanceFromFirst,
            $distanceFromPrevious,
            &$elementIndex,
            $elementsPassedAt,
            $firstPoles
        ) {
            $elementIndex++;

            $lastPole = [
                'passed_at' => $lastElemensPassedRegister[$elementId]->passed_at,
                'user_id' => $lastElemensPassedRegister[$elementId]->user_id,
                'distance_from_first' => $distanceFromFirst[$elementId][$lastElemensPassedRegister[$elementId]->user_id],
                'distance_from_previous' => $distanceFromPrevious[$elementId][$lastElemensPassedRegister[$elementId]->user_id],
            ];

            $poles = [];

            if ($firstPoles)
                foreach ($elementsPassedAt[$elementId] as $userId => $passedAt) {
                    if (!is_null($passedAt))
                        $poles[] = [
                            'passed_at' => $passedAt,
                            'user_id' => $userId,
                            'distance_from_first' => $distanceFromFirst[$elementId][$userId],
                            'distance_from_previous' => $distanceFromPrevious[$elementId][$userId],
                        ];
                }

            return [
                'id' => $elementId,
                'name' => $elementsEntities[$elementId]['name'],
                'block' => $elementsEntities[$elementId]['block'],
                'duration' => $elementsEntities[$elementId]['duration'],
                'accumulated_duration' => $elementsEntities[$elementId]['accumulated_duration'],
                'order' => $elementIndex,
                'in_block_order' => $elementsEntities[$elementId]['in_block_order'],
                'passed_at' => $lastElemensPassedRegister[$elementId]->passed_at,
                'user' => $lastElemensPassedRegister[$elementId]->user,
                'user_id' => $lastElemensPassedRegister[$elementId]->user_id,
                'last_pole' => $lastPole,
                'poles' =>  $poles

            ];
        }, array_keys($elementsEntities));



        usort($elementsData, function ($a, $b) {
            return $b["order"] <=> $a["order"]; // Ordena por edad de menor a mayor
        });

        if ($firstPoles)
            return $elementsData[0]['poles'];

        return $elementsData;
    }

    public function getControlCalculationData(array $calculationData): array
    {
        $data = [
            'users' => [],
            'elements' => [],
        ];


        // get users that has regitered elements in the parade
        foreach ($calculationData['data'] as $row) {
            if (!isset($data['users'][$row->user_id])) {
                $data['users'][$row->user_id] = [
                    'name' => $row->user,
                    'elements' => [],
                ];
            }
            $data['users'][$row->user_id]['elements'][$row->element_id] = $row->passed_at;
        }

        // sort elements by passed_at   
        foreach ($data['users'] as $userId => $user) {
            uasort($data['users'][$userId]['elements'], function ($a, $b) {
                return $a <=> $b;
            });
        }

        // sort users by first element passed_at
        uasort($data['users'], function ($a, $b) {
            return reset($a['elements']) <=> reset($b['elements']);
        });

        // get parade
        $accumulatedDuration = 0;

        foreach ($calculationData['elements'] as $index => $element) {

            if ($index == 0) {
                $accumulatedDuration = 0;
                $duration = 0;
            } else {
                $accumulatedDuration += $element->duration;
                $duration = $element->duration;
            }

            // get the datetime when the users passed the element
            $passedUsersAt = [];
            foreach ($data['users'] as $userId => $user) {
                $passedUsersAt[$userId] = $user['elements'][$element->element_id] ?? null;
            }
            // sort users by passed_at
            asort($passedUsersAt);

            $data['elements'][$element->element_id] = [
                'id' => $element->element_id,
                'name' => $element->element,
                'duration' => $duration,
                'accumulated_duration' => $accumulatedDuration,

                // users that passed the element sorted by passed_at
                'passedUsersAt' => $passedUsersAt,
            ];
        }

        $data['elements'] = array_values($data['elements']);

        return $data;
    }

    public function getElementsAndUsersData(array $calculationData): array
    {
        $data = [
            'users' => [],
            'elements' => [],
        ];

        $usersOrder = 0;
        foreach ($calculationData['data'] as $row) {
            if (!isset($data['users'][$row->user_id])) {
                $usersOrder++;
                $data['users'][$row->user_id] =  [
                    'order' => $usersOrder,
                    'name' => $row->user,
                ];
            }
        }


        $accumulatedDuration = 0;
        $elementsOrder = 0;
        foreach ($calculationData['elements'] as $index =>  $row) {
            if (!isset($data['elements'][$row->element_id])) {
                if ($index == 0) {
                    $accumulatedDuration = 0;
                    $duration = 0;
                } else {
                    $duration = $row->duration;
                    $accumulatedDuration += $row->duration;
                }

                $elementsOrder++;


                $data['elements'][$row->element_id] = [
                    "name" => $row->element,
                    "block" => $row->block,
                    "in_block_order" => $row->in_block_order,
                    "duration" => $duration,
                    "accumulated_duration" => $accumulatedDuration,
                    "order" => $elementsOrder
                ];
            }
        }

        return $data;
    }


    public function calcDifferenceInMinutes(string $date1, string $date2): int
    {
        $date1 = new \DateTime($date1);
        $date2 = new \DateTime($date2);

        $diff = $date1->diff($date2);

        return $diff->d * 24 * 60 + $diff->h * 60 + $diff->i;
    }

    public function calcDifferenceInSeconds(string $date1, string $date2): int
    {
        $date1 = new \DateTime($date1);
        $date2 = new \DateTime($date2);

        $diff = $date1->diff($date2);

        return ($diff->d * 24 * 60 * 60) + ($diff->h * 60 * 60) + ($diff->i * 60) + $diff->s;
    }
}
