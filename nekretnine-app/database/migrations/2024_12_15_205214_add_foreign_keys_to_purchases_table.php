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
        Schema::table('purchases', function (Blueprint $table) {
            $table->foreign('fk_property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('fk_buyer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('fk_agent_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            $table->dropForeign(['fk_property_id']);
            $table->dropForeign(['fk_buyer_id']);
            $table->dropForeign(['fk_agent_id']);
        });
    }
};
