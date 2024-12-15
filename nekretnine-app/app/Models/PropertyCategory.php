<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PropertyCategory extends Model
{
    use HasFactory;

    protected $table = 'property_categories';

    protected $fillable = [
        'property_category_name', 
        'property_category_description',
        'property_category_icon'
    ];

    // Relacija sa nekretninama
    public function properties()
        {
            return $this->hasMany(Property::class);
       }
}
