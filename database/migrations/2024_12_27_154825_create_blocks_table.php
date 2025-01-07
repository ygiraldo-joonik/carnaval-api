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
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();

            // parade_id
            $table->unsignedBigInteger('parade_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->integer('order')->default(0);

            $table->foreign('parade_id')->references('id')->on('parades')->onDelete('cascade');

            $table->unique(['parade_id', 'name']);

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
        Schema::dropIfExists('blocks');
    }
};
