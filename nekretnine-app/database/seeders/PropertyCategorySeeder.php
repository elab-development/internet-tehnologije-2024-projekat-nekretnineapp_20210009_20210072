<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $property_categories = [
            'Residential Properties',
            'Commercial Properties',
            'Luxury Properties',
            'Vacation Rentals',
            'Agricultural Properties',
            'Land',
            'Industrial Properties',
            'Mixed-Use Properties',
            'Student Housing',
            'Affordable Housing',
        ];

        foreach ($property_categories as $property_category) {
            PropertyCategory::factory()->create([
                'name' => $property_category, 
            ]);
        }
        
    }
}
