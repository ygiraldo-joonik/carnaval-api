<?php

namespace App\Http\Controllers\Api\Travels;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use App\Models\TravelLocation;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TravelLocationController extends Controller
{
    use ApiTrait;

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
            'travel_id' => 'required|exists:travels,id',
        ]);

        if ($validator->fails())
            return $this->onError(400, 'Validation Error', null, $validator->errors());

        $travel = Travel::where('id', $request->travel_id)->first();

        if (!$travel) {
            return $this->onError(404, 'Travel not found');
        }

        if ($travel->status == 2) {
            return $this->onError(400, 'Travel is not active');
        }

        $travelLocation = TravelLocation::create([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'travel_id' => $request->travel_id,
        ]);

        return $this->onSuccess(201, 'Travel Location Created', $travelLocation);
    }

    public function list($travel_id)
    {
        $travelLocations = TravelLocation::where('travel_id', $travel_id)->get();

        return $this->onSuccess(200, 'Travel Locations', $travelLocations);
    }
}
