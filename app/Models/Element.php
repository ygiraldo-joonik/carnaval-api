<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Element extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'element_type_id',
        'block_id',
        'order',
        'longitude'
    ];

    public function elementType()
    {
        return $this->belongsTo(ElementType::class);
    }

    public function block()
    {
        return $this->belongsTo(Block::class);
    }
}
