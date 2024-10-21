<?php

namespace App\Http\Controllers\Api\Travels;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use App\Traits\ApiTrait;

class TravelController extends Controller
{

    use  ApiTrait;

    public function list()
    {
        $travels = Travel::where('user_id', auth()->user()->id)->withCount('locations')->get();

        return $this->onSuccess(200, 'Travels', $travels);
    }

    public function getActiveTravel()
    {
        $travel = Travel::where('user_id', auth()->user()->id)->where('status', 1)->first();

        if (!$travel) {
            return $this->onSuccess(200, 'No Active Travel', null);
        }

        return $this->onSuccess(200, 'Active Travel', $travel);
    }

    public function create()
    {

        $activeTravels = Travel::where('user_id', auth()->user()->id)->where('status', 1)->count();

        if ($activeTravels > 0) {
            return $this->onError(400, 'You already have an active travel');
        }

        $userTravelsCount = Travel::where('user_id', auth()->user()->id)
            ->withTrashed()
            ->count();

        $travel = Travel::create([
            'user_id' => auth()->user()->id,
            'name' => "Travel " . ($userTravelsCount + 1),
            'status' => 1,
        ]);

        return $this->onSuccess(201, 'Travel Created', $travel);
    }

    public function finishTravel($id)
    {
        $travel = Travel::where('user_id', auth()->user()->id)->where('id', $id)->first();

        if (!$travel) {
            return $this->onError(404, 'Travel not found');
        }

        $travel->finished_at = now();
        $travel->status = 2;
        $travel->save();

        return $this->onSuccess(200, 'Travel Finished', $travel);
    }

    public function delete($id)
    {
        $travel = Travel::where('user_id', auth()->user()->id)->where('id', $id)->first();

        if (!$travel) {
            return $this->onError(404, 'Travel not found');
        }

        if ($travel->status == 1) {
            return $this->onError(400, 'You can not delete an active travel');
        }

        $travel->delete();

        return $this->onSuccess(200, 'Travel Deleted');
    }
}
