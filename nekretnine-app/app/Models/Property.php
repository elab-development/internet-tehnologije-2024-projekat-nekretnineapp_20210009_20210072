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
         'fk_agent_id',
    ];

    // Relacija sa kategorijom
   /**
     * The category this property belongs to.
     */
    public function propertyCategory()
    {
        // fk_property_category_id → id on property_categories table
        return $this->belongsTo(
            PropertyCategory::class,
            'fk_property_category_id',
            'id'
        );
    }

    // Relacija sa kupovinama
    public function purchases()
        {
            return $this->hasMany(Purchase::class);
       }

    // Relacija sa korisnikom koji je agent
    public function agent()
    {
        return $this->belongsTo(User::class, 'fk_agent_id');
    }
}
