<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Parade;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParadeService
{
    protected string $defaultEventName;

    public function __construct()
    {
        $this->defaultEventName = env('DEFAULT_EVENT_NAME', "Carnaval de Barranquilla 2025");
    }

    public function validateData(array $data)
    {


        $validator = Validator::make($data, [
            'name' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'start_location' => 'required|string',
            'end_location' => 'required|string',
            'distance' => 'required|numeric',
        ]);

        return $validator->validate();
    }

    // create parade
    public function create($data)
    {

        $defaultEvent = Event::where('name', $this->defaultEventName)->first();

        if (!$defaultEvent) {
            throw new Exception('Default event not found');
        }

        $data['event_id'] = $defaultEvent->id;

        return Parade::create($data);
    }

    // update parade
    public function update($data, $id)
    {
        $parade = Parade::find($id);

        if (!$parade) {
            return null;
        }

        $parade->update($data);

        return $parade;
    }

    public function delete($id)
    {
        $parade = Parade::find($id);

        $parade->delete();

        return $parade;
    }
}
