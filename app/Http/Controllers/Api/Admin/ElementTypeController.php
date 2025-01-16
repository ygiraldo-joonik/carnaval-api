<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\ElementTypeService;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;

class ElementTypeController extends Controller
{
    use ApiTrait;

    protected ElementTypeService $elementTypeService;

    public function __construct(ElementTypeService $elementTypeService)
    {
        $this->elementTypeService = $elementTypeService;
    }

    public function store(Request $request)
    {
        try {
            $data = $this->elementTypeService->validateData($request->all());

            $elementType = $this->elementTypeService->create($data);

            return $this->onSuccess(201, 'Element Type created sucessfully', $elementType);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {

            $data = $this->elementTypeService->validateData($request->all());

            $elementType = $this->elementTypeService->update($id, $data);

            if (!$elementType) {
                return $this->onError(404, 'Element Type not found');
            }

            return $this->onSuccess(200, 'Element Type updated sucessfully', $elementType);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function list(Request $request)
    {
        try {
            $elementTypes = $this->elementTypeService->getAll();

            return $this->onSuccess(200, 'Element Types retrieved sucessfully', $elementTypes);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function find(Request $request, $id)
    {
        try {
            $elementType = $this->elementTypeService->getElementTypeById($id);

            if (!$elementType) {
                return $this->onError(404, 'Element Type not found');
            }

            return $this->onSuccess(200, 'Element Type retrieved sucessfully', $elementType);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $this->elementTypeService->delete($id);

            return $this->onSuccess(200, 'Element Type removed sucessfully');
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }
}
