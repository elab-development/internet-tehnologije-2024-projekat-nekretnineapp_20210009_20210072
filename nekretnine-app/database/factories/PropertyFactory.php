<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_name' => $this->faker->unique()->words(3, true),
            'property_price' => $this->faker->numberBetween(50000, 500000),
            'property_description' => $this->faker->paragraph(),
            'property_image_link' => $this->faker->imageUrl(640, 480, 'real estate', true),
            'property_360_image_link' => $this->faker->imageUrl(800, 600, 'real estate', true),
            'fk_property_category_id' => PropertyCategory::factory(),
            'property_latitude' => $this->faker->latitude(-90, 90),
            'property_longitude' => $this->faker->longitude(-180, 180),
        ];
    }
}
