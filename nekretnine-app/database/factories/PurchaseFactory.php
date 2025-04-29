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

        $agent = User::factory()->create(['role' => 'agent']);
        $buyer = User::factory()->create(['role' => 'buyer']);

        return [
            'purchase_notes' => $this->faker->paragraph(),
            'purchase_status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'purchase_price' => $this->faker->numberBetween(50000, 500000),
            'purchase_payment_type' => $this->faker->randomElement(['credit_card', 'cash', 'crypto']),
            'purchase_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'fk_buyer_id' => $buyer->id, 
            'fk_agent_id' => $agent->id, 
            'fk_property_id' =>  Property::inRandomOrder()->first()->id, 
        ];
    }
}
