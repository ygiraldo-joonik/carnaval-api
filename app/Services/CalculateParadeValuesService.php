<?php

namespace App\Services;

use App\Models\Parade;

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
}
