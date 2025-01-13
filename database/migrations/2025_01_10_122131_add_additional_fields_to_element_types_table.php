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
        Schema::table('element_types', function (Blueprint $table) {
            $table->text('description')->nullable();
            $table->integer('people_count')->default(0);
            $table->float('length')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('element_types', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('people_count');
            $table->dropColumn('length');
        });
    }
};
