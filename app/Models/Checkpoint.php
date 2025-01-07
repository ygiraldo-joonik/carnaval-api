<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Checkpoint extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description', 'location_id', 'parade_id', 'monitor_id'];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function parade()
    {
        return $this->belongsTo(Parade::class);
    }

    public function monitor()
    {
        return $this->belongsTo(User::class, 'monitor_id');
    }
}
