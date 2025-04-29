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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->text('purchase_notes')->nullable();
            $table->string('purchase_status')->default('pending'); 
            $table->integer('purchase_price');
            $table->string('purchase_payment_type')->nullable(); 
            $table->date('purchase_date')->nullable();
            $table->unsignedBigInteger('fk_buyer_id'); 
            $table->unsignedBigInteger('fk_agent_id'); 
            $table->unsignedBigInteger('fk_property_id'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
