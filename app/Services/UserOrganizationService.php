<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\User;

class UserOrganizationService
{
    public function getOrganizationUsers($organizationId)
    {
        $organization = Organization::find($organizationId);
        return $organization->users;
    }

    public function getUserOrganizations($userId)
    {
        $user = User::find($userId);
        return $user->organizations;
    }

    // invite user to organization
    public function inviteUser($organizationId, $userId, $roleId)
    {
        $organization = Organization::find($organizationId);

        if (!$organization->users->contains($userId)) {
            // get user with pivot
            $userOrganization = $organization->users()
                ->wherePivot('user_id', $userId)
                ->withPivot('invitation_token')
                ->first();
        } else {
            $organization->users()
                ->attach(
                    $userId,
                    [
                        'role_id' => $roleId
                    ]
                );
        }
    }

    public function generateInvitationToken()
    {
        return bin2hex(random_bytes(16));
    }
}
