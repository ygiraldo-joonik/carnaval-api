<?php

namespace App\Services;

use App\Models\ElementType;
use App\Models\Organization;
use Exception;
use Illuminate\Support\Facades\Validator;

class ElementTypeService
{

    protected string $defaultOrganizationName;

    public function __construct()
    {
        $this->defaultOrganizationName = env('DEFAULT_ORGANIZATION_NAME');
    }

    public function validateData(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'description' => 'string',
            'color' => 'required|string',
            'people_count' => 'numeric',
            'length' => 'numeric',
        ]);

        return $validator->validate();
    }

    public function getAll()
    {
        $defaultOrganization = Organization::where('name', $this->defaultOrganizationName)->first();

        if (!$defaultOrganization) {
            throw new Exception('Default organization not found');
        }

        return ElementType::where('organization_id', $defaultOrganization->id)
            ->orderBy('name')
            ->get();
    }

    public function getElementTypeById($id)
    {
        return ElementType::find($id);
    }

    public function create($data)
    {
        $defaultOrganization = Organization::where('name', $this->defaultOrganizationName)->first();

        if (!$defaultOrganization) {
            throw new Exception('Default organization not found');
        }

        $data['organization_id'] = $defaultOrganization->id;

        return ElementType::create($data);
    }

    public function update($id, $data)
    {
        $elementType = ElementType::find($id);
        $elementType->update($data);
        return $elementType;
    }

    public function delete($id)
    {
        $elementType = ElementType::find($id);
        $elementType->delete();
    }
}
