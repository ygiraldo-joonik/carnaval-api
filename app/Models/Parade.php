<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parade extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'date',
        'event_id',
        'start_location',
        'end_location',
        'distance',
        'duration',
        'street_width',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }
}
