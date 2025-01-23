<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ElementTypeService;
use App\Services\UserParadeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElementController extends Controller
{
    protected UserParadeService $userParadeService;
    protected ElementTypeService $elementTypeService;

    public function __construct(UserParadeService $userParadeService, ElementTypeService $elementTypeService)
    {
        $this->userParadeService = $userParadeService;
        $this->elementTypeService = $elementTypeService;
    }

    public function index(Request $request, int $paradeId)
    {
        $parade = $this->userParadeService->find($paradeId, $request->user()->id);
        $elementTypes = $this->elementTypeService->getAll();

        return Inertia::render('Admin/Parades/Elements', compact('parade', 'elementTypes'));
    }
}
