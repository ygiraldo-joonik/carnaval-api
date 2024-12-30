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
        Schema::create('checkpoints', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->unsignedBigInteger('parade_id');
            $table->unsignedBigInteger('monitor_id');
            $table->unsignedBigInteger('location_id');
            $table->float('distance_from_start')->default(0);
            $table->integer('order')->default(0);

            $table->foreign('parade_id')->references('id')->on('parades')->onDelete('cascade');
            $table->foreign('monitor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');

            $table->unique(['parade_id', 'name']);
            $table->unique(['parade_id', 'monitor_id']);
            $table->unique(['parade_id', 'location_id']);

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
        Schema::dropIfExists('checkpoints');
    }
};
