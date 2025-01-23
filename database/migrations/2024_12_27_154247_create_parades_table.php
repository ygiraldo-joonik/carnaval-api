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
            $table->text('description')->nullable();

            // start and end date
            $table->date('date');
            $table->float('distance');

            // foreign keys
            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

            // start and end location id
            $table->string('start_location');
            $table->string('end_location');


            // unique constraint
            $table->unique(['event_id', 'name']);

            $table->softDeletes();

            $table->unique(['event_id', 'name', 'deleted_at']);

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
