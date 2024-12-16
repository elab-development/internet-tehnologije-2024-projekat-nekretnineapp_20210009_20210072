<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PropertyCategory;

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

        $images_360_url = ["https://momento360.com/e/u/ee454bfd59604bada47269e6b1f4b843?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=73&size=medium&display-plan=true",
        "https://momento360.com/e/u/b558d39958c04e0c8c7b7e1fde52aa9b?utm_campaign=embed&utm_source=other&heading=-10.8&pitch=0.9&field-of-view=75&size=medium&display-plan=true",
        "https://momento360.com/e/u/fa77818ede2b4910b56ef460364f5a72?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true",
        "https://momento360.com/e/u/418d9cb8107042398a779af5aff9ec4b?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true",
        "https://momento360.com/e/u/0b2a80b3ffef4ae5a88844bf4828d4de?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true",
        "https://momento360.com/e/u/1bb0b3dd01604f9485f67f4e16ef098a?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"];

        $images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6GtRXRaDFlZzDRhDBb6t3WThiZ2Sp9obZg&s",
        "https://www.adanirealty.com/-/media/project/realty/blogs/types-of-residential-properties.ashx",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWM6RL5nf2Gs_vNsDFdqXV6mblbrOdVCuJ1XZ9HfxwYRA0vL-50-UlBEDl5-75mdB4aM8&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwF1Th18F03p5HtOCXdzV7aHi6f9xynOK_vEmRQrnrJ3CUIFzZ23Ht-1--gXO0IXsmOU&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgyjOcx0frdGTbn49ZPvqtf01TtNgjg59zkNy8ScI_3HbPfMqLr04lTtbH-IKhRQK1J0&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFzL-aqaQcrPoiwCQhVWa9-oSePTHPELWRal9TVElk3YZpx8J1kQXF18tbNA482CUwfFA&usqp=CAU"];


        return [
            'property_name' => $this->faker->unique()->words(3, true),
            'property_price' => $this->faker->numberBetween(50000, 500000),
            'property_description' => $this->faker->paragraph(),
            'property_image_link' => $this->faker->randomElement($images),
            'property_360_image_link' => $this->faker->randomElement($images_360_url),
            'fk_property_category_id' => PropertyCategory::factory(),
            'property_latitude' => $this->faker->latitude(-90, 90),
            'property_longitude' => $this->faker->longitude(-180, 180),
        ];
    }
}
