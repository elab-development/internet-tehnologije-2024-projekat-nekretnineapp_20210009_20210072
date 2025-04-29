<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyCategory>
 */
class PropertyCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_category_name' => $this->faker->unique()->word(),
            'property_category_description' => $this->faker->sentence(),
            'property_category_icon' => $this->faker->imageUrl(50, 50, 'icons', true),
        ];
    }
}
