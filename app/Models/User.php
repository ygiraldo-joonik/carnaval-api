<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens,
        HasFactory,
        Notifiable,
        HasRoles,
        SoftDeletes;

    const GUARD_NAME = 'web';

    protected function getDefaultGuardName(): string
    {
        return static::GUARD_NAME;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function travels()
    {
        return $this->hasMany(Travel::class);
    }

    public function organizationsOwned()
    {
        return $this->hasMany(Organization::class, 'owner_id');
    }

    public function organizations(): BelongsToMany
    {
        $tableNames = config('permission.table_names');
        return $this->belongsToMany(
            Organization::class,
            $tableNames['model_has_roles'],
            'user_id',
            'organization_id'
        )
            ->using(UserOrganization::class)
            ->withPivot(['role_id', 'accepted_at'])
            ->whereNotNull($tableNames['model_has_roles'] . '.accepted_at')
            ->whereNull($tableNames['model_has_roles'] . '.revoked_at');
    }

    public function elementsPassed()
    {
        return $this->belongsToMany(Element::class, 'element_passed_user', 'user_id', 'element_id')
            ->withPivot('inferred')
            ->withTimestamps();
    }
}
