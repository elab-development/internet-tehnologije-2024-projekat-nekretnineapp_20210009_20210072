<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'property_category_id' => $this->id,
            'property_category_name' => $this->property_category_name, 
            'property_category_description' => $this->property_category_description,
            'property_category_icon' => $this->property_category_icon
        ];
    }
}
