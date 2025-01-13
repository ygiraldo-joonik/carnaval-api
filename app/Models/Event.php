<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'user_id', 'organization_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function elementTypes()
    {
        return $this->hasMany(ElementType::class);
    }

    public function parades()
    {
        return $this->hasMany(Parade::class);
    }
}
