<?php

namespace App\Services;

use App\Models\Element;
use Illuminate\Support\Facades\Validator;

class ElementService
{

    protected CalculateParadeValuesService $calculateParadeValuesService;

    public function __construct(CalculateParadeValuesService $calculateParadeValuesService)
    {
        $this->calculateParadeValuesService = $calculateParadeValuesService;
    }

    public function getAll($blockId)
    {
        return Element::where('block_id', $blockId)->with('elementType', 'block')->get();
    }

    public function find($id)
    {
        return Element::with('elementType', 'block')->find($id);
    }

    public function validateData($data)
    {
        // make validator
        $validator = Validator::make($data, [
            'name' => 'required',
            'description' => 'required',
            'element_type_id' => 'required|exists:element_types,id',
            'block_id' => 'required|exists:blocks,id',
            'order' => 'integer',
            'people_count' => 'required|integer',
            'length' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function store($data): Element
    {
        $blockElementsCount = Element::where("block_id", $data['block_id'])->count();

        $data['order'] = $blockElementsCount + 1;

        $element = Element::create($data);

        $this->calculateParadeValuesService->updateParadeComputedValues($element->block->parade_id);

        return $element;
    }

    public function update($data, $id): ?Element
    {
        $element = Element::find($id);

        if (!$element) {
            return null;
        }

        $element->update($data);

        $this->calculateParadeValuesService->updateParadeComputedValues($element->block->parade_id);

        return $element;
    }

    public function validateUpdateOrderData(array $data)
    {

        $validator = Validator::make($data, [
            'block_id' => 'required|exists:blocks,id',
            'elements' => 'required|array|min:2',
            'elements.*.id' => 'required|exists:elements,id',
            'elements.*.order' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function updateOrder($data)
    {
        $elements = $data['elements'];
        $updateElements = [];
        foreach ($elements as $element) {
            $updated =  Element::where([
                'id' => $element['id'],
                'block_id' => $data['block_id']
            ])->update(['order' => $element['order']]);

            if ($updated)
                $updateElements[] = $element;
        }

        return $updateElements;
    }

    public function validateUpdateElementPosition(array $data)
    {
        $validator = Validator::make($data, [
            'element_id' => 'required|exists:elements,id',
            'block_id' => 'required|exists:blocks,id',
            'order' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function updateElementPosition($elementId, $blockId, $order)
    {

        $element = Element::find($elementId);

        if ($element->block_id == $blockId) {
            if ($order > $element->order) {
                // Update elements between the new and old position
                Element::where('block_id', $blockId)
                    ->where('order', '>', $element->order)
                    ->where('order', '<=', $order)
                    ->decrement('order');
            } else {
                // Update elements between the new and old position
                Element::where('block_id', $blockId)
                    ->where('order', '>=', $order)
                    ->where('order', '<', $element->order)
                    ->increment('order');
            }
        } else if ($element->block_id != $blockId) {
            // Update elements after the old position in the old block
            Element::where('block_id', $element->block_id)
                ->where('order', '>', $element->order)
                ->decrement('order');

            // Update elements after the new position in the new block
            Element::where('block_id', $blockId)
                ->where('order', '>=', $order)
                ->increment('order');
        }

        $element->update(['block_id' => $blockId, 'order' => $order]);

        $this->calculateParadeValuesService->updateParadeComputedValues($element->block->parade_id);

        return $element;
    }


    public function delete($id)
    {
        $element = Element::find($id);

        if (!$element) {
            return null;
        }

        $paradeId = $element->block->parade_id;

        $element->delete();

        $this->calculateParadeValuesService->updateParadeComputedValues($paradeId);

        return $element;
    }
}
