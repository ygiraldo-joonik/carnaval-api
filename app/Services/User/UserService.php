<?php

namespace App\Services\User;

use App\Models\Organization;
use App\Models\User;

class UserService
{
    public function getAll()
    {
        return User::with('organizations')->get();
    }

    public function getUserById($id)
    {
        return User::with('organizations')->find($id);
    }

    public function activeUser($id)
    {
        User::find($id)->update(['state' => 1]);
    }

    public function deactiveUser($id)
    {
        User::find($id)->update(['state' => 0]);
    }
}
