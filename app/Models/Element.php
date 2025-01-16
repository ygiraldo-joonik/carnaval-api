<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Element extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'element_type_id',
        'block_id',
        'order',
        'people_count',
        'length',
    ];

    public function type()
    {
        return $this->belongsTo(ElementType::class, 'element_type_id');
    }

    public function block()
    {
        return $this->belongsTo(Block::class);
    }

    public function usersPassed()
    {
        return $this->belongsToMany(User::class, 'element_passed_user', 'element_id', 'user_id')
            ->withPivot('inferred')
            ->withTimestamps();
    }
}
