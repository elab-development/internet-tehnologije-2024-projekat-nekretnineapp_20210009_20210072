<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'property_id' => $this->id,
            'property_name' => $this->property_name, 
            'property_price' => $this->property_price,
            'property_description' => $this->property_description, 
            'property_image_link' => $this->property_image_link,
            'property_360_image_link' => $this->property_360_image_link, 
            'fk_property_category_id' => $this->fk_property_category_id, 
            'property_latitude' => $this->property_latitude, 
            'property_longitude' => $this->property_longitude, 
            'fk_agent_id' => $this->fk_agent_id
        ];
    }
}
