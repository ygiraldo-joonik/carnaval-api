<?php

namespace App\Traits\Authorization;

trait ValidateUserIdTrait
{
    public function validateUserId(int $user_id): bool
    {
        return $user_id == request()->user()->id;
    }
}
