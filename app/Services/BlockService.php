<?php

namespace App\Services;

use App\Models\Block;
use Illuminate\Support\Facades\Validator;

class BlockService
{
    // validate block data
    public function validateData(array $data)
    {
        $rules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'order' => 'numeric',
            'parade_id' => 'required|exists:parades,id',
        ];

        $validator = Validator::make($data, $rules);

        return $validator->validate();
    }

    public function create($data)
    {
        $paradeBlocksCount = Block::where('parade_id', $data['parade_id'])->count();

        $data['order'] = $paradeBlocksCount + 1;

        return Block::create($data);
    }

    public function update($data, $id)
    {
        $block = Block::find($id);

        if (!$block) {
            return null;
        }

        $block->update($data);

        return $block;
    }

    public function validateUpdateOrderData(array $data)
    {

        $validator = Validator::make($data, [
            'parade_id' => 'required|exists:parades,id',
            'blocks' => 'required|array|min:2',
            'blocks.*.id' => 'required|exists:blocks,id',
            'blocks.*.order' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    public function updateOrder($data)
    {
        $blocks = $data['blocks'];
        $updatedBlocks = [];

        foreach ($blocks as $block) {
            $updated = Block::where([
                'id' => $block['id'],
                'parade_id' => $data['parade_id']
            ])->update(['order' => $block['order']]);

            if ($updated)
                $updatedBlocks[] = $block;
        }

        return $updatedBlocks;
    }

    public function delete($id)
    {
        $block = Block::find($id);

        $block->delete();

        return $block;
    }
}
