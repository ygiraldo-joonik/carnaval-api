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
        Schema::create('elements', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->float('longitude')->nullable();

            $table->unsignedBigInteger('block_id');
            $table->unsignedBigInteger('element_type_id');

            $table->foreign('block_id')->references('id')->on('blocks')->onDelete('cascade');
            $table->foreign('element_type_id')->references('id')->on('element_types')->onDelete('cascade');

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
        Schema::dropIfExists('elements');
    }
};
