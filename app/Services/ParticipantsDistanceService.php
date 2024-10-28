<?php

namespace App\Services;

use App\Models\Travel;
use Carbon\Carbon;
use League\Csv\Writer;
use stdClass;

class ParticipantsDistanceService
{

    public function lastDateWithTravels()
    {
        $lastTravel = Travel::latest()->first();

        return $lastTravel?->created_at;
    }

    public function getParticipantsDistance($date = null)
    {
        $travelsRawData = Travel::getRawData($date, 'asc');
        $timeLocations =  $this->generateTimeLocationsArray($travelsRawData, $date);

        $timeDistances = $this->getParticipantsDistanceInMetters($timeLocations);
        $timeLocationsAndDistance = $this->mergeTimeLocationsWithDistances($timeLocations, $timeDistances);
        $headers = $this->getLocationsAndDistanceHeadersSorted($timeLocationsAndDistance);

        $distanceAndHeaders = new stdClass;

        $distanceAndHeaders->headers = $headers;
        $distanceAndHeaders->data = $timeLocationsAndDistance;

        return $distanceAndHeaders;
    }

    /**
     * Generates an array of time-based locations for participants on a specific date.
     *
     * This function processes raw location data and organizes it into an array where the keys are 
     * times (formatted as 'H:i') and the values are arrays of user IDs mapped to their respective 
     * latitude and longitude coordinates.
     *
     * @param array $locationsRawData An array of raw location data objects. Each object is expected 
     *                                to have 'location_at', 'user_id', 'latitude', and 'longitude' properties.
     * @param string $date The specific date (formatted as 'Y-m-d') for which the locations should be filtered.
     * 
     * @return array An associative array where the keys are times (formatted as 'H:i') and the values 
     *               are arrays mapping user IDs to their latitude and longitude coordinates.
     */
    public function generateTimeLocationsArray(array $locationsRawData, string $date): array
    {
        // Initialize an empty array to store the time-based locations.
        $locations = [];

        foreach ($locationsRawData as $location) {

            // if this location was taken after the selected date, skip it
            $inDate = Carbon::parse($location->location_at)->format('Y-m-d') == $date;

            if (!$inDate) continue;

            // Get the time of the location in 'H:i' format.
            $time = Carbon::parse($location->location_at)->format('H:i');

            // Initialize the locations array for the current time if not already set.
            if (!isset($locations[$time])) {
                $locations[$time] = [];
            }


            $userId = strval($location->user_id);

            // Store the latitude and longitude of the user at the current time.
            if (!isset($locations[$time][$userId])) {
                $locations[$time][$userId] = "$location->latitude,$location->longitude";
            }
        }
        return $locations;
    }

    /**
     * Calculate the distances between participants at different times.
     *
     * This function takes an array of time-based locations and calculates the 
     * distances between each pair of participants at each time point.
     *
     * @param array $timeLocations An associative array where the keys are time points 
     *                             and the values are arrays of user locations in the 
     *                             format 'latitude,longitude'.
     * @return array An associative array where the keys are time points and the values 
     *               are arrays of distances between each pair of participants in meters.
     */
    public function getParticipantsDistanceInMetters($timeLocations)
    {
        // Initialize an empty array to store distances.
        $distances = [];

        // Get all the time keys from the input array.
        $timeKeys = array_keys($timeLocations);

        // Iterate over each time point.
        foreach ($timeKeys as $time) {

            // Get the locations of users at the current time point.
            $usersLocationsInTime = $timeLocations[$time];

            // Re-index the user locations array.
            $usersLocations = array_values($usersLocationsInTime);

            // Get the user IDs.
            $usersId = array_keys($usersLocationsInTime);


            // If there is only one user, skip to the next time point.
            if (count($usersId) == 1)
                continue;

            // Initialize the distances array for the current time point if not already set.
            if (!isset($distances[$time]))
                $distances[$time] = [];

            // Iterate over each pair of user locations.
            for ($i = 0; $i < count($usersLocations); $i++) {
                for ($j = $i + 1; $j < count($usersLocations); $j++) {
                    // Split the location strings into latitude and longitude.
                    $user1 = explode(',', $usersLocations[$i]);
                    $user2 = explode(',', $usersLocations[$j]);

                    // Calculate the distance between the two points.
                    $distance = $this->calcDistanceInMettersBetweenPoints($user1, $user2);

                    // Get the user IDs for the current pair.
                    $distanceHeader = $this->getUsersDistanceHeader($usersId[$i], $usersId[$j]);

                    // Store the calculated distance in the distances array.
                    $distances[$time][$distanceHeader] = $distance;
                }
            }
        }

        // Return the array of distances.
        return $distances;
    }

    /**
     * Get the distance header between two users.
     *
     * This method returns a string representing the distance header between two users.
     * The header is formatted as "user1Id - user2Id" if user1Id is less than user2Id,
     * otherwise it is formatted as "user2Id - user1Id".
     *
     * @param int $user1Id The ID of the first user.
     * @param int $user2Id The ID of the second user.
     * @return string The distance header between the two users.
     */
    public function getUsersDistanceHeader($user1Id, $user2Id)
    {
        if ($user1Id < $user2Id)
            return "$user1Id - $user2Id";
        else
            return "$user2Id - $user1Id";
    }

    /**
     * Merges time-based location data with corresponding distance data.
     *
     * This function takes two associative arrays: one containing time-based location data
     * and another containing time-based distance data. It merges the data for each time key
     * and returns a new array with the combined data.
     *
     * @param array $timeLocations An associative array where keys are time points and values are location data.
     * @param array $timeDistances An associative array where keys are time points and values are distance data.
     * @return array An associative array where keys are time points and values are merged location and distance data.
     */
    public function mergeTimeLocationsWithDistances($timeLocations, $timeDistances)
    {

        // Extract the keys (time points) from the timeLocations array.
        $timeKeys = array_keys($timeLocations);

        // Initialize an empty array to store the merged data.
        $merged = [];

        // Iterate over each time key.
        foreach ($timeKeys as $time) {

            // If the current time key does not exist in the timeDistances array, skip to the next iteration.
            if (!isset($timeDistances[$time])) continue;

            // Retrieve the location data for the current time key.
            $locations = $timeLocations[$time];

            // Retrieve the distance data for the current time key.
            $distances = $timeDistances[$time];

            // iInitialize the time key in the merged array with the distance data.
            $merged[$time] = $distances;

            // Iterate over each location and add it to the merged array in combination with the distance data.
            // This is because the location keys ar being converted to order indexes if we just merge the arrays.
            // So we need to merge the data manually.
            foreach ($locations as $key => $value)
                $merged[$time][$key] =  $value;
        }

        // Return the merged array containing combined location and distance data for each time key.
        return $merged;
    }

    public function getLocationsAndDistanceHeadersSorted($locationsAndDistance)
    {
        $headers = $this->getLocationsAndDistanceHeaders($locationsAndDistance);
        $headers =  $this->sortDistanceAndLocationsHeadersArray($headers);
        return  $headers;
    }

    public function getLocationsAndDistanceHeaders($locationsAndDistance)
    {

        $headers = [];

        $timeKeys = array_keys($locationsAndDistance);

        foreach ($timeKeys as $time) {

            $locations = $locationsAndDistance[$time];

            $locationsKeys = array_keys($locations);

            foreach ($locationsKeys as $key) {
                if (!in_array($key, $headers)) {
                    $headers[] = $key;
                }
            }
        }


        return $headers;
    }

    /**
     * Sorts an array by separating numeric and non-numeric keys, sorting each group, 
     * and then merging them back together.
     *
     * @param array $array The input array to be sorted.
     * @return array The sorted array with numeric keys first followed by non-numeric keys.
     */
    public function sortDistanceAndLocationsHeadersArray($array)
    {
        // Filter out numeric keys from the array
        $numericKeys = array_filter($array, function ($key) {
            return is_numeric($key);
        });

        // Filter out non-numeric keys from the array
        $nonNumericKeys = array_filter($array, function ($key) {
            return !is_numeric($key);
        });

        // Sort the numeric keys
        sort($numericKeys);

        // Sort the non-numeric keys
        sort($nonNumericKeys);

        // Merge the sorted numeric and non-numeric keys and return the result
        return [...$numericKeys, ...$nonNumericKeys];
    }

    /**
     * Calculate the distance in meters between two geographical points.
     *
     * This function calculates the distance between two points on the Earth's surface
     * specified by their latitude and longitude in decimal degrees. The result is 
     * returned in meters.
     *
     * @param array $position1 An array containing the latitude and longitude of the first point.
     * @param array $position2 An array containing the latitude and longitude of the second point.
     * @return float The distance between the two points in meters.
     */
    public function calcDistanceInMettersBetweenPoints(array $position1, array $position2)
    {
        // Extract latitude and longitude from the input arrays
        [$lat1, $lon1] = $position1;
        [$lat2, $lon2] = $position2;

        // Convert latitude and longitude values to float
        [$lat1, $lon1] = [floatval($lat1), floatval($lon1)];
        [$lat2, $lon2] = [floatval($lat2), floatval($lon2)];

        // Calculate the angle between the two points
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));

        // Convert the angle distance to radians and then to degrees
        $dist = acos($dist);
        $dist = rad2deg($dist);

        // Convert the distance from degrees to meters
        $metters = $dist * 60 * 1.1515 * 1609.344;

        // Return the calculated distance in meters
        return $metters;
    }



    public function generateParticipantsDistanceCsv($date = null)
    {
        $timeDistancesAndLocations = $this->getParticipantsDistance($date);
        $headers = $timeDistancesAndLocations->headers;
        $data = $timeDistancesAndLocations->data;


        $csv = Writer::createFromString('');

        // Insert the header
        $csv->insertOne([
            'TIME',
            ...$headers
        ]);

        $timeKeys = array_keys($data);

        // Insert data rows
        foreach ($timeKeys as $time)
            $csv->insertOne([
                $time,
                ...array_map(function ($header) use ($data, $time) {
                    return $this->formatDistanceOrLocation(
                        $data[$time][$header] ?? null
                    );
                }, $headers)
            ]);

        return $csv;
    }


    public function generateParticipantsDistanceCsvName($date = null)
    {
        if ($date)
            return "\"participants-distance-$date.csv\"";

        return "\"participants-distance.csv\"";
    }

    public function  formatDistanceOrLocation($value)
    {
        if ($value == null)
            return '-';

        if ($value == 0)
            return '0';

        if (str_contains($value, ','))
            return $value;

        return number_format($value, 2);
    }
}
