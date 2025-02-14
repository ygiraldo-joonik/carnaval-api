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
    public function getParadeDataForCalculations($paradeId, bool $onlyElementsPassed = false): array
    {
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
            WHERE parade_id = :parade_id
            ORDER BY passed_at asc
        ", ['parade_id' => $paradeId]);

        $elementsWhere = "parade_id = :parade_id";

        if ($onlyElementsPassed) {
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
                b.name as block,
                b.id as block_id
            FROM elements e
            INNER JOIN blocks b ON b.id = e.block_id
            INNER JOIN parades p ON p.id = 3
            WHERE $elementsWhere
            ORDER BY b.order asc, e.order asc
        ", ['parade_id' => $paradeId]);

        return compact('data', 'elements');
    }

    /*+ Calculate relative distance for each user
        * 
        
        * @param int $paradeId
        * @return array
    */
    public function distance($paradeId, bool $withCalculationData = false, bool $onlyElementsPassed = false)
    {
        $dataForCalculations = $this->getParadeDataForCalculations($paradeId, $onlyElementsPassed);

        $calculationsData = $this->getControlCalculationData($dataForCalculations);

        $isThereData = count($calculationsData['elements']) > 0 && count($calculationsData['users']) > 0;

        if (count($calculationsData['elements']) == 0) {
            return compact('isThereData');
        }

        $distanceFromPrevious = [];
        $distanceFromFirst = [];

        $firstElement = $calculationsData['elements'][0];

        foreach ($calculationsData['elements'] as $index => $element) {

            if ($index == 0) {
                $previousElement = $element;
            } else
                $previousElement = $calculationsData['elements'][$index - 1];

            $distanceFromFirst[$element["id"]] = [];
            $distanceFromPrevious[$element["id"]] = [];

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
            return compact('distanceFromFirst', 'distanceFromPrevious', 'entities', 'isThereData', 'calculationsData', 'dataForCalculations');
        }

        return compact('distanceFromFirst', 'distanceFromPrevious', 'entities', 'isThereData');
    }

    /*+ Calculate relative distance for each user
        * 
        
        * @param int $paradeId
        * @return array
    */
    public function elementsPosition($paradeId): array
    {
        $paradeControlData = $this->distance($paradeId, true, true);

        // return $paradeControlData;
        $lastElemensPassedRegister = $this->getLastElemensPassedRegister($paradeControlData['dataForCalculations']['data']);

        $elementsEntities = $paradeControlData['entities']['elements'];

        $elementsData = $this->relateElementsWithControlData(
            $elementsEntities,
            $lastElemensPassedRegister,
            $paradeControlData['distanceFromFirst'],
            $paradeControlData['distanceFromPrevious']
        );

        return $elementsData;
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
        array $distanceFromPrevious
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

        // get parade
        $accumulatedDuration = 0;

        foreach ($calculationData['elements'] as $index => $row) {

            if ($index == 0) {
                $accumulatedDuration = 0;
                $duration = 0;
            } else {
                $accumulatedDuration += $row->duration;
                $duration = $row->duration;
            }


            $data['elements'][$row->element_id] = [
                'id' => $row->element_id,
                'name' => $row->element,
                'duration' => $duration,
                'accumulated_duration' => $accumulatedDuration,
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
