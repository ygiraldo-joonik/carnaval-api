<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parades', function (Blueprint $table) {
            $table->float('duration')->nullable(); // duration in minutes
            $table->float('street_width')->nullable(); // street width in meters
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parades', function (Blueprint $table) {
            $table->dropColumn('duration');
            $table->dropColumn('street_width');
        });
    }
};
