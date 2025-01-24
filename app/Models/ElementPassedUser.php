<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ElementPassedUser extends Model
{
    use HasFactory;

    protected $table = "element_passed_user";

    protected $fillable = ['element_id', 'user_id', 'inferred', 'created_at'];

    public function element()
    {
        return $this->belongsTo(Element::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
