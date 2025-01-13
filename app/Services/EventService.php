<?php

namespace App\Services;

use App\Models\Event;

class EventService
{


    // Get all events of an organization
    public function getOrganizationEvents($organizationId)
    {
        return Event::where('organization_id', $organizationId)->get();
    }
}
