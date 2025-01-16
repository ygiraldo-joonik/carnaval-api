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
        Schema::create('element_types', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('color')->default('#abb8c3');

            $table->unsignedBigInteger('organization_id');

            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
            $table->unique(['organization_id', 'name']);

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
        Schema::dropIfExists('element_types');
    }
};
