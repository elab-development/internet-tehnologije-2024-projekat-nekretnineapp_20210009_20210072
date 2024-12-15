<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id('property_id');
            $table->string('property_name'); 
            $table->integer('property_price');
            $table->text('property_description')->nullable(); 
            $table->text('property_image_link');
            $table->text('property_360_image_link');
            $table->unsignedBigInteger('fk_property_category_id'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
