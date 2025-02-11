<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Element;
use App\Models\User;
use App\Services\ElementService;
use App\Services\UserParadeService;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ElementController extends Controller
{
    use ApiTrait;

    protected ElementService $elementService;
    protected UserParadeService $userParadeService;

    public function __construct(
        ElementService $elementService,
        UserParadeService $userParadeService
    ) {
        $this->elementService = $elementService;
        $this->userParadeService = $userParadeService;
    }

    public function store(Request $request)
    {
        try {
            $data = $this->elementService->validateData($request->all());

            $element = $this->elementService->store($data);

            return $this->onSuccess(201, 'Element created sucessfully', $element);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {

            $data = $this->elementService->validateData($request->all());

            $element = $this->elementService->update($data, $id);

            if (!$element) {
                return $this->onError(404, 'Element not found');
            }

            return $this->onSuccess(200, 'Element updated sucessfully', $element);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    // update order
    public function updateOrder(Request $request)
    {
        try {
            $data = $this->elementService->validateUpdateOrderData($request->all());

            $elements = $this->elementService->updateOrder($data);

            return $this->onSuccess(200, 'Elements order updated sucessfully', $elements);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }


    public function delete($id)
    {
        try {
            $element = $this->elementService->delete($id);

            if (!$element) {
                return $this->onError(404, 'Element not found');
            }

            return $this->onSuccess(200, 'Element deleted sucessfully', $element);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function registerElementPassedUser(Request $request)
    {
        try {
            $this->userParadeService->validateRegisterElementPassedUser($request->all());

            $element = $this->userParadeService->registerElementPassedUser(
                $request->user()->id,
                $request->element_id,
                $request->date,
            );

            return $this->onSuccess(200, 'Element passed user registered sucessfully', $element);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function bulkRegiserElementsPassed(int $paradeId, Request $request)
    {
        try {
            $this->elementService->validateBulkRegisterElementsPassed($request);

            $elements = $this->elementService->bulkRegisterElementsPassed($paradeId, $request->file('file'));

            return $this->onSuccess(200, 'Elements passed user registered sucessfully', $elements);
        } catch (\Throwable $th) {
            error_log($th->getMessage(), $th->getTraceAsString());
            return $this->onError(500, $th->getMessage());
        }
    }

    public function updateElementPosition(Request $request)
    {
        try {
            $data = $this->elementService->validateUpdateElementPosition($request->all());

            $element = $this->elementService->updateElementPosition(
                $data['element_id'],
                $data['block_id'],
                $data['order']
            );

            return $this->onSuccess(200, 'Element position updated sucessfully', $element);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }
}
