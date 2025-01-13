<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\organizationService;
use App\Services\UserOrganizationService;
use App\Services\UserService;
use App\Traits\ApiTrait;
use App\Traits\Authorization\UserAuthorizationTrait;

class UserController extends Controller
{

    use UserAuthorizationTrait, ApiTrait;

    protected UserService $userService;
    protected organizationService $organizationService;
    protected UserOrganizationService $userOrganizationService;

    public function __construct(
        UserService $userService,
        OrganizationService $organizationService,
        UserOrganizationService $userOrganizationService
    ) {
        $this->userService = $userService;
        $this->organizationService = $organizationService;
        $this->userOrganizationService = $userOrganizationService;
    }

    public function all()
    {
        if (!$this->canGetAllUsers())
            return $this->onError(403, 'Unauthorized');

        $users = $this->userService->getAll();
        return $this->onSuccess(200, 'Users Retrieved', $users);
    }

    public function byOrganization(int $organizationId)
    {
        $organization = $this->organizationService->getById($organizationId);

        if (!$this->canGetOrganizationUsers($organization))
            return $this->onError(403, 'Unauthorized');

        $users = $this->userOrganizationService->getOrganizationUsers($organization->id);

        return $this->onSuccess(200, 'Users Retrieved', $users);
    }
}
