<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ElementTypeService;
use Inertia\Inertia;

class ElementTypeController extends Controller
{
    protected ElementTypeService $elementTypeService;

    public function __construct(ElementTypeService $elementTypeService)
    {
        $this->elementTypeService = $elementTypeService;
    }

    public function index()
    {
        $elementTypes = $this->elementTypeService->getAll();

        return Inertia::render('Admin/ElementTypes/Index', [
            'elementTypes' => $elementTypes
        ]);
    }
}
