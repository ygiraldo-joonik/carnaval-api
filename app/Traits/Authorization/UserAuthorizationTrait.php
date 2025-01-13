<?php


namespace App\Traits\Authorization;

use App\Models\Organization;
use Illuminate\Support\Facades\Gate;

trait UserAuthorizationTrait
{
    public function canGetAllUsers()
    {
        return Gate::allows(
            'viewAll',
            auth()->user()
        );
    }

    public function canGetOrganizationUsers(Organization $organization)
    {

        return auth()->user()->can(
            'viewFromOrg',
            auth()->user(),
            $organization
        );
    }

    public function canInviteUsers(Organization $organization)
    {
        return auth()->user()->can(
            'invite',
            auth()->user(),
            $organization
        );
    }

    public function canManageUsers(Organization $organization)
    {
        return auth()->user()->can(
            'manage',
            auth()->user(),
            $organization
        );
    }
}
