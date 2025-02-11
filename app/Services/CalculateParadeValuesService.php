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
    public function getParadeDataForCalculations($paradeId): array
    {

        $data = DB::select("
            SELECT 
                e.name AS element,
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
            ORDER BY user_id, b.order, e.order
        ", ['parade_id' => $paradeId]);

        return  $data;
    }

    /*+ Calculate relative distance for each user
        * 
        
        * @param int $paradeId
        * @return array
    */
    public function distance($paradeId)
    {
        $dataForCalculations = $this->getParadeDataForCalculations($paradeId);

        $calculationsData = $this->getCalculationsData($dataForCalculations);

        $isThereData = count($calculationsData['elements']) > 0 && count($calculationsData['users']) > 0;

        if (count($calculationsData['elements']) == 0) {
            return compact('isThereData');
        }

        $distanceFromPrevious = [];
        $distanceFromFirst = [];

        $firstElement = $calculationsData['elements'][0];

        foreach ($calculationsData['elements'] as $index => $element) {

            if ($index == 0) {
                continue;
            }

            $previousElement = $calculationsData['elements'][$index - 1];

            $distanceFromFirst[$element["id"]] = [];
            $distanceFromPrevious[$element["id"]] = [];

            foreach ($calculationsData['users'] as $userId => $user) {

                // distance from first
                if (isset($user["elements"][$element["id"]]) && isset($user["elements"][$firstElement['id']])) {
                    $distanceFromFirst[$element["id"]][$userId] =  $this->calcDifferenceInMinutes(
                        $user["elements"][$element["id"]],
                        $user["elements"][$firstElement['id']]
                    );
                } else {
                    $distanceFromFirst[$element["id"]][$userId]  =  null;
                }

                // distance from previous
                if (isset($user["elements"][$element["id"]]) && isset($user["elements"][$previousElement['id']])) {
                    $distanceFromPrevious[$element["id"]][$userId] =  $this->calcDifferenceInMinutes(
                        $user["elements"][$element["id"]],
                        $user["elements"][$previousElement['id']]
                    );
                } else {
                    $distanceFromPrevious[$element["id"]][$userId]  =  null;
                }
            }
        }

        $entities = $this->getElementsAndUsersData($dataForCalculations);

        return compact('distanceFromFirst', 'distanceFromPrevious', 'entities', 'isThereData');
    }

    public function getCalculationsData(array $calculationData): array
    {
        $data = [
            'users' => [],
            'elements' => [],
        ];

        foreach ($calculationData as $row) {
            if (!isset($data['users'][$row->user_id]))
                $data['users'][$row->user_id] = [
                    'name' => $row->user,
                    'elements' => []
                ];

            $data['users'][$row->user_id]['elements'][$row->element_id] = $row->passed_at;

            if (!isset($data['elements'][$row->element_id]))
                $data['elements'][$row->element_id] = [
                    'name' => $row->element,
                    'id' => $row->element_id,
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

        foreach ($calculationData as $row) {
            if (!isset($data['users'][$row->user_id]))
                $data['users'][$row->user_id] =  $row->user;


            if (!isset($data['elements'][$row->element_id]))
                $data['elements'][$row->element_id] = $row->element;
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
}
