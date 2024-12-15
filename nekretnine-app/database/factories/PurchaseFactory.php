<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Property;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $buyer = User::factory(['role' => 'buyer'])->create(); 
        $agent = User::factory(['role' => 'agent'])->create(); 


        return [
            'purchase_notes' => $this->faker->optional()->paragraph(),
            'purchase_status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'purchase_price' => $this->faker->numberBetween(50000, 500000),
            'purchase_payment_type' => $this->faker->optional()->randomElement(['credit_card', 'cash', 'crypto']),
            'purchase_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'purchase_discount' => $this->faker->optional()->numberBetween(1000, 5000),
            'fk_buyer_id' => $buyer->user_id, 
            'fk_agent_id' => $seller->user_id, 
            'fk_property_id' =>  Service::inRandomOrder()->first()->property_id, 
        ];
    }
}