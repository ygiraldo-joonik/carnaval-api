<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelLocation extends Model
{
    use HasFactory;

    protected $table = 'travel_locations';

    protected $fillable = [
        'latitude',
        'longitude',
        'travel_id',
    ];
}
