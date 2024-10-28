<?php

namespace App\Http\Controllers\Admin\Travels;

use App\Http\Controllers\Controller;
use App\Services\TravelRawDataService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class TravelsRawDataController extends Controller
{

    private TravelRawDataService $travelService;

    public function __construct(TravelRawDataService $travelService)
    {
        $this->travelService = $travelService;
    }


    /**
     * Display travels view.
     */
    public function index(Request $request): Response
    {

        $travels = $this->travelService->getTravelsRawDataPaginated(
            $request->query('date', null),
            $request->query('page', 1),
            $request->query('per_page', 15),
        );

        return Inertia::render('Travels/RawData', [
            'travels_paginated' => $travels,
            'date' => $request->query('date', null),
        ]);
    }


    /**
     * Download travels data.
     */
    public function download(Request $request): HttpResponse
    {
        $date = $request->input('date', null);

        $travelsCsv = $this->travelService->generateTravelsCsv(
            $date
        );

        // Prepare the response
        return response()->make($travelsCsv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=" . $this->travelService->generateTravelsCsvName($date),
        ]);
    }
}
