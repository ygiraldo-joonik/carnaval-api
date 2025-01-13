<?php

namespace App\Services;

use App\Models\Element;
use Illuminate\Support\Facades\Validator;

class ElementService
{

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
        ]);

        return $validator->validate();
    }

    public function create($data)
    {
        $blockElementsCount = Element::where("block_id", $data['block_id'])->count();

        $data['order'] = $blockElementsCount + 1;

        return Element::create($data);
    }

    public function update($data, $id)
    {
        $element = Element::find($id);

        if (!$element) {
            return null;
        }

        $element->update($data);

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


    public function delete($id)
    {
        $element = Element::find($id);

        if (!$element) {
            return null;
        }

        $element->delete();

        return $element;
    }
}
