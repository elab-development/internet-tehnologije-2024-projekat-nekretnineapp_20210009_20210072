<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'purchase_id' => $this->purchase_id,
            'purchase_notes' => $this->purchase_notes,
            'purchase_status' => $this->purchase_status,
            'purchase_price' => $this->purchase_price,
            'purchase_payment_type' => $this->purchase_payment_type,
            'purchase_date' => $this->purchase_date ? $this->purchase_date->format('Y-m-d') : null,
            'purchase_discount' => $this->discount,
           
            'property' => [
                'property_id' => $this->property->property_id,
                'name' => $this->property->property_name,
                'category' => $this->property->propertyCategory->property_category_name ?? 'No Category',
            ],
            'buyer' => [
                'buyer_id' => $this->buyer->user_id,
                'email' => $this->buyer->email,
            ],
            'agent' => [
                'agent_id' => $this->agent->user_id,
                'email' => $this->seller->email,
            ],
        ];
    }
}
