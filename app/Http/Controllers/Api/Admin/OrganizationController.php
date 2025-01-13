<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\UserOrganizationService;
use App\Traits\ApiTrait;
use App\Traits\Authorization\ValidateUserIdTrait;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{

    use ApiTrait, ValidateUserIdTrait;

    protected UserOrganizationService $userOrganizationService;

    public function __construct(UserOrganizationService $userOrganizationService)
    {
        $this->userOrganizationService = $userOrganizationService;
    }


    public function byUser(Request $request)
    {

        $users = $this->userOrganizationService->getUserOrganizations($request->user()->id);
        return  $this->onSuccess(200, 'Users Retrieved', $users);
    }
}
