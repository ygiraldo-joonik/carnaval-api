<?php

namespace App\Services;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;

class organizationService
{
    public function getAll(): Collection
    {
        return Organization::all();
    }

    public function getById($id): Organization
    {
        return Organization::find($id);
    }

    public function createOrganization($data)
    {
        return Organization::create($data);
    }

    public function updateOrganization($id, $data)
    {
        return Organization::find($id)->update($data);
    }

    public function deleteOrganization($id)
    {
        return Organization::find($id)->delete();
    }
}
