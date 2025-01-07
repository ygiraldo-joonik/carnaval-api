<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserOrganization extends Pivot
{
    use HasFactory;

    protected $table;

    public function __construct()
    {
        $tableNames = config('permission.table_names');
        $this->table = $tableNames['model_has_roles'];
    }

    protected $fillable = [
        'organization_id',
        'user_id',
        'role_id',
        'model_type',
        'accepted_at',
        'declined_at',
        'revoked_at',
        'invitation_token',
    ];
}
