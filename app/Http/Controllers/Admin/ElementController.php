<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\UserParadeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElementController extends Controller
{
    protected UserParadeService $userParadeService;

    public function __construct(UserParadeService $userParadeService)
    {
        $this->userParadeService = $userParadeService;
    }

    public function index(Request $request, int $paradeId)
    {
        $parade = $this->userParadeService->find($paradeId, $request->user()->id);

        return Inertia::render('Admin/Parades/Elements', compact('parade'));
    }
}
