<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'purchase_notes', 
        'purchase_status',
        'purchase_price', 
        'purchase_payment_type',
        'purchase_date', 
        'purchase_discount', 
        'fk_buyer_id', 
        'fk_agent_id', 
        'fk_property_id'
    ];

    // Relacija sa kupcem
    public function buyer()
        {
            return $this->belongsTo(User::class, 'fk_buyer_id');
        }

    // Relacija sa agentom
    public function agent()
        {
            return $this->belongsTo(User::class, 'fk_agent_id');
        }


    // Relacija sa nekretninom
    public function property()
        {
            return $this->belongsTo(Property::class, 'fk_property_id');
        }

}
