<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
     public function toArray($request): array
     {
         return [
             'user_id' => $this->user_id,
             'email' => $this->email,
             'role' => $this->role,   
         ];
     }
}