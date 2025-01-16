<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Parade;
use App\Services\ParadeService;
use App\Services\UserParadeService;
use App\Traits\ApiTrait;
use App\Traits\Authorization\ValidateUserIdTrait;
use Illuminate\Http\Request;

class ParadeController extends Controller
{

    use ApiTrait, ValidateUserIdTrait;

    protected ParadeService $paradeService;
    protected UserParadeService $userParadeService;


    public function __construct(ParadeService $paradeService, UserParadeService $userParadeService)
    {
        $this->paradeService = $paradeService;
        $this->userParadeService = $userParadeService;
    }

    public function store(Request $request)
    {
        try {
            $data = $this->paradeService->validateData($request->all());

            $parade = $this->paradeService->create($data);

            return $this->onSuccess(201, 'Parade created sucessfully', $parade);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {

            $data = $this->paradeService->validateData($request->all());

            $parade = $this->paradeService->update($data, $id);

            if (!$parade) {
                return $this->onError(404, 'Parade not found');
            }

            return $this->onSuccess(200, 'Parade updated sucessfully', $parade);
        } catch (\Throwable $th) {
            return $this->onError(500, $th->getMessage());
        }
    }

    public function list(Request $request)
    {
        $parades = $this->userParadeService->list($request->user()->id, $request->query('date', null));
        return $this->onSuccess(200, 'User parades', $parades);
    }

    public function find(Request $request, int $id)
    {
        $parade = $this->userParadeService->find($id, $request->user()->id);
        return $this->onSuccess(200, 'User parade', $parade);
    }

    public function findAndMarkElementsPassed(Request $request, int $id)
    {
        $parade = $this->userParadeService->findAndMarkElementsPassed($id, $request->user()->id);
        return $this->onSuccess(200, 'User parade', $parade);
    }

    public function delete($id)
    {
        $this->paradeService->delete($id);

        return $this->onSuccess(200, 'Parade removed sucessfully');
    }
}
