<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\CalculateParadeValuesService;
use App\Services\ParadeService;
use App\Services\UserParadeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParadeController extends Controller
{
    protected UserParadeService $userParadeService;
    protected CalculateParadeValuesService $calculateParadeValuesService;


    public function __construct(UserParadeService $userParadeService, CalculateParadeValuesService $calculateParadeValuesService)
    {
        $this->userParadeService = $userParadeService;
        $this->calculateParadeValuesService = $calculateParadeValuesService;
    }

    public function index(Request $request)
    {
        $parades = $this->userParadeService->list($request->user()->id);

        return Inertia::render('Admin/Parades/Index', compact('parades'));
    }

    public function control(int $paradeId)
    {
        $parade = $this->userParadeService->find($paradeId);
        $distance = $this->calculateParadeValuesService->distance($paradeId);

        setPermissionsTeamId(0);

        $user = User::find(auth()->id());
        $canImport = $user->hasRole('super-admin');

        return Inertia::render('Admin/Parades/Control', compact('parade', 'distance', 'canImport'));
    }
}
