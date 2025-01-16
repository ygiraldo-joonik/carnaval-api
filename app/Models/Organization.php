<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'logo', 'state', 'owner_id'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function elementTypes()
    {
        return $this->hasMany(ElementType::class);
    }

    public function parades()
    {
        return $this->hasManyThrough(Parade::class, Event::class);
    }

    public function users(): BelongsToMany
    {
        $tableNames = config('permission.table_names');

        return $this->belongsToMany(
            User::class,
            $tableNames['model_has_roles'],
            'organization_id',
            'user_id'
        )
            ->using(UserOrganization::class)
            ->withPivot(['role_id', 'accepted_at', 'invitation_token'])
            ->whereNotNull($tableNames['model_has_roles'] . '.accepted_at')
            ->whereNull($tableNames['model_has_roles'] . '.revoked_at');
    }
}
