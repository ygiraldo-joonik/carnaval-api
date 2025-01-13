<?php

namespace App\Policies;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view all users.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAll(User $user)
    {
        setPermissionsTeamId(0);
        error_log(json_encode($user->getAllPermissions(), JSON_PRETTY_PRINT));
        return $user->hasPermissionTo('all-users.read', User::GUARD_NAME);
    }

    /**
     * Determine whether the user can view the users of an organization.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewFromOrg(User $user, Organization $organization)
    {
        setPermissionsTeamId($organization->id);
        return $user->hasPermissionTo('users.read', 'web');
    }

    /**
     * Determine whether the user can invite users.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function invite(User $user, Organization $organization)
    {
        setPermissionsTeamId($organization->id);
        return $user->hasPermissionTo('users.invite', 'web');
    }

    /**
     * Determine whether the user can revoke or assing roles to a user in an organization.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function manage(User $user, Organization $organization)
    {
        setPermissionsTeamId($organization->id);
        return $user->hasPermissionTo('users.manage', 'web');
    }
}
