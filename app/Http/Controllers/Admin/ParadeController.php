<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ParadeService;
use App\Services\UserParadeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParadeController extends Controller
{
    protected UserParadeService $userParadeService;


    public function __construct(UserParadeService $userParadeService)
    {
        $this->userParadeService = $userParadeService;
    }

    public function index(Request $request)
    {
        $parades = $this->userParadeService->list($request->user()->id);

        return Inertia::render('Admin/Parades/Index', compact('parades'));
    }
}
