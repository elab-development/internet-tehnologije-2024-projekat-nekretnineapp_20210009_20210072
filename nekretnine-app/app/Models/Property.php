<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Property extends Model
{

    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'property_name', 
        'property_price',
        'property_description', 
        'property_image_link',
        'property_360_image_link', 
        'fk_property_category_id', 
        'property_latitude', 
        'property_longitude', 
    ];

    // Relacija sa kategorijom
    public function propertyCategory()
        {
            return $this->belongsTo(User::class, 'fk_property_category_id');
        }

    // Relacija sa kupovinama
    public function purchases()
        {
            return $this->hasMany(Purchase::class);
       }
}
