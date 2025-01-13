<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Block extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description', 'parade_id', 'order'];

    public function parade()
    {
        return $this->belongsTo(Parade::class);
    }

    public function elements()
    {
        return $this->hasMany(Element::class);
    }
}
