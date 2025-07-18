<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PropertyCategory;
use App\Models\User; 

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

        $locations = [
            ["lat" => "40.712776", "lon" => "-74.005974"],  // New York, USA
            ["lat" => "51.507351", "lon" => "-0.127758"],   // London, UK
            ["lat" => "35.689487", "lon" => "139.691711"],  // Tokyo, Japan
            ["lat" => "48.856613", "lon" => "2.352222"],    // Paris, France
            ["lat" => "34.052235", "lon" => "-118.243683"], // Los Angeles, USA
            ["lat" => "-33.868820", "lon" => "151.209290"], // Sydney, Australia
            ["lat" => "55.755825", "lon" => "37.617298"],   // Moscow, Russia
            ["lat" => "37.774929", "lon" => "-122.419418"], // San Francisco, USA
            ["lat" => "19.432608", "lon" => "-99.133209"],  // Mexico City, Mexico
            ["lat" => "-23.550520", "lon" => "-46.633308"], // São Paulo, Brazil
            ["lat" => "41.902782", "lon" => "12.496366"],   // Rome, Italy
            ["lat" => "39.904202", "lon" => "116.407394"],  // Beijing, China
            ["lat" => "52.520008", "lon" => "13.404954"],   // Berlin, Germany
            ["lat" => "28.613939", "lon" => "77.209023"],   // New Delhi, India
            ["lat" => "-34.603722", "lon" => "-58.381592"], // Buenos Aires, Argentina
            ["lat" => "1.352083", "lon" => "103.819839"],   // Singapore, Singapore
            ["lat" => "37.566536", "lon" => "126.977966"],  // Seoul, South Korea
            ["lat" => "30.044420", "lon" => "31.235712"],   // Cairo, Egypt
            ["lat" => "25.276987", "lon" => "55.296249"],   // Dubai, UAE
            ["lat" => "50.850346", "lon" => "4.351721"],    // Brussels, Belgium
            ["lat" => "-22.906847", "lon" => "-43.172897"], // Rio de Janeiro, Brazil
            ["lat" => "45.464203", "lon" => "9.189982"],    // Milan, Italy
            ["lat" => "53.349805", "lon" => "-6.260310"],   // Dublin, Ireland
            ["lat" => "60.169856", "lon" => "24.938379"],   // Helsinki, Finland
            ["lat" => "43.653225", "lon" => "-79.383186"],  // Toronto, Canada
            ["lat" => "55.953251", "lon" => "-3.188267"],   // Edinburgh, Scotland
            ["lat" => "40.416775", "lon" => "-3.703790"],   // Madrid, Spain
            ["lat" => "-37.813629", "lon" => "144.963058"], // Melbourne, Australia
            ["lat" => "31.230391", "lon" => "121.473701"],  // Shanghai, China
            ["lat" => "59.329323", "lon" => "18.068581"],   // Stockholm, Sweden
            ["lat" => "35.227085", "lon" => "-80.843124"],  // Charlotte, USA
            ["lat" => "33.448376", "lon" => "-112.074036"], // Phoenix, USA
            ["lat" => "29.760427", "lon" => "-95.369804"],  // Houston, USA
            ["lat" => "41.385063", "lon" => "2.173404"],    // Barcelona, Spain
            ["lat" => "-26.204103", "lon" => "28.047304"],  // Johannesburg, South Africa
            ["lat" => "59.911491", "lon" => "10.757933"],   // Oslo, Norway
            ["lat" => "47.606209", "lon" => "-122.332069"], // Seattle, USA
            ["lat" => "35.149532", "lon" => "-90.048981"],  // Memphis, USA
            ["lat" => "-36.848461", "lon" => "174.763336"], // Auckland, New Zealand
            ["lat" => "43.700111", "lon" => "-79.416298"],  // Toronto, Canada
            ["lat" => "41.008240", "lon" => "28.978359"],   // Istanbul, Turkey
            ["lat" => "24.713552", "lon" => "46.675297"],   // Riyadh, Saudi Arabia
            ["lat" => "13.756331", "lon" => "100.501762"],  // Bangkok, Thailand
            ["lat" => "-6.208763", "lon" => "106.845596"],  // Jakarta, Indonesia
            ["lat" => "10.762622", "lon" => "106.660172"],  // Ho Chi Minh City, Vietnam
            ["lat" => "22.319303", "lon" => "114.169361"],  // Hong Kong, China
            ["lat" => "50.075539", "lon" => "14.437800"],   // Prague, Czech Republic
            ["lat" => "37.983810", "lon" => "23.727539"],   // Athens, Greece
            ["lat" => "45.421530", "lon" => "-75.697193"]   // Ottawa, Canada
        ];

        $randomLocation = $this->faker->randomElement($locations);

        return [
            'property_name' => $this->faker->unique()->words(3, true),
            'property_price' => $this->faker->numberBetween(50000, 500000),
            'property_description' => $this->faker->paragraph(),
            'property_image_link' => $this->faker->randomElement($images),
            'property_360_image_link' => $this->faker->randomElement($images_360_url),
            'fk_property_category_id' => $this->faker->numberBetween(1, 10),
            'property_latitude' => $randomLocation['lat'],
            'property_longitude' => $randomLocation['lon'],
              'fk_agent_id'              => User::factory()->state([
                'role' => 'agent',
            ]),
        ];
    }
}
