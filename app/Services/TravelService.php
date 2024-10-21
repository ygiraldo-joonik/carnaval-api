<?php

namespace App\Services;

use App\Models\Travel;
use League\Csv\Writer;

class TravelService
{
    public function getTravels($date = null)
    {
        return Travel::withCount('locations')
            ->with('user')
            ->when($date, function ($query) use ($date) {
                return $query->whereDate('created_at', $date);
            })
            ->get();
    }

    public function getTravelsRawDataPaginated($date = null, $page = 1, $perPage = 10,)
    {
        return Travel::getRawDataPaginated($date, $page, $perPage);
    }

    public function getTravelsRawData($date = null)
    {
        return Travel::getRawData($date);
    }

    public function generateTravelsCsv($date = null)
    {
        $travels = $this->getTravelsRawData($date);

        $csv = Writer::createFromString('');

        // Insert the header
        $csv->insertOne([
            'ID',
            'USER ID',
            'USER NAME',
            'USER EMAIL',
            "LONGITUDE",
            "LATITUDE",
            "LOCATION AT",
            "START DATE",
            "FINISH DATE",
            "DURATION"
        ]);

        // Insert data rows
        foreach ($travels as $travel)
            $csv->insertOne([
                $travel->id,
                $travel->user_id,
                $travel->user_name,
                $travel->user_email,
                $travel->longitude,
                $travel->latitude,
                $travel->location_at,
                $travel->started_at,
                $travel->finished_at,
                $travel->minutes_difference,
            ]);

        return $csv;
    }


    public function generateTravelsCsvName($date = null)
    {
        if ($date)
            return "\"travels-$date.csv\"";

        return "\"travels.csv\"";
    }
}
