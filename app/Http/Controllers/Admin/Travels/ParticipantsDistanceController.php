<?php

namespace App\Http\Controllers\Admin\Travels;

use App\Http\Controllers\Controller;
use App\Services\ParticipantsDistanceService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

use function PHPUnit\Framework\isNull;

class ParticipantsDistanceController extends Controller
{

    private ParticipantsDistanceService $participantsDistanceService;

    public function __construct(ParticipantsDistanceService $participantsDistanceService)
    {
        $this->participantsDistanceService = $participantsDistanceService;
    }


    /**
     * Display travels view.
     */
    public function index(Request $request): Response
    {
        $date = $request->query('date', null);

        if (!$date) {
            $lasDateWithTravels = $this->participantsDistanceService->lastDateWithTravels();
            $date = $lasDateWithTravels ?  $lasDateWithTravels->format('Y-m-d') : date('Y-m-d');
        }

        $participantsDistance = $this->participantsDistanceService->getParticipantsDistance(
            $date
        );

        return Inertia::render('Travels/Distance', [
            'participants_distance' => $participantsDistance,
            'date' => $date,
        ]);
    }

    /**
     * Download participants distance data.
     */
    public function download(Request $request): HttpResponse
    {
        $date = $request->input('date', null);

        $travelsCsv = $this->participantsDistanceService->generateParticipantsDistanceCsv(
            $date
        );

        // Prepare the response
        return response()->make($travelsCsv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=" . $this->participantsDistanceService->generateParticipantsDistanceCsvName($date),
        ]);
    }
}
