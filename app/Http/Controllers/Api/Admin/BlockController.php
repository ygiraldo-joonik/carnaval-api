<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\BlockService;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    use ApiTrait;

    protected BlockService $blockService;

    public function __construct(BlockService $blockService)
    {
        $this->blockService = $blockService;
    }

    public function create(Request $request)
    {
        try {
            $data = $this->blockService->validateData($request->all());

            $block = $this->blockService->create($data);

            return $this->onSuccess(201, 'Block created sucessfully', $block);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {

            $data = $this->blockService->validateData($request->all());

            $block = $this->blockService->update($data, $id);

            if (!$block) {
                return $this->onError(404, 'Block not found');
            }

            return $this->onSuccess(200, 'Block updated sucessfully', $block);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function updateOrder(Request $request)
    {
        try {
            $data = $this->blockService->validateUpdateOrderData($request->all());

            $blocks = $this->blockService->updateOrder($data);

            return $this->onSuccess(200, 'Blocks order updated sucessfully', $blocks);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $this->blockService->delete($id);

            return $this->onSuccess(200, 'Block removed sucessfully');
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }
}
