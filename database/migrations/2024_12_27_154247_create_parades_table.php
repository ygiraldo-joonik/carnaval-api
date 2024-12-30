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
        Schema::create('parades', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('description')->nullable();

            // start and end date
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->float('average_speed');
            $table->float('distance');

            // foreign keys
            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

            // start and end location id
            $table->unsignedBigInteger('start_location_id');
            $table->unsignedBigInteger('end_location_id');
            $table->foreign('start_location_id')->references('id')->on('locations')->onDelete('cascade');
            $table->foreign('end_location_id')->references('id')->on('locations')->onDelete('cascade');

            // unique constraint
            $table->unique(['event_id', 'name']);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parades');
    }
};
