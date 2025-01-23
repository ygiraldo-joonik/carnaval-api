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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('owner_id');

            $table->string('name');
            $table->string('logo')->nullable();
            $table->integer('state')->default(1); // 1: active, 0: inactive

            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');

            $table->softDeletes();

            $table->unique(['owner_id', 'name', 'deleted_at']);

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
        Schema::dropIfExists('organizations');
    }
};
