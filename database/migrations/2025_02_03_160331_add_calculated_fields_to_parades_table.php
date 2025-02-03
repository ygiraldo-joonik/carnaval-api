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
            $table->integer('people_count')->default(0);
            $table->float('elements_length')->default(0);
            $table->float('total_duration')->default(0);
            $table->float('speed')->default(0);
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
            $table->dropColumn('people_count');
            $table->dropColumn('elements_length');
            $table->dropColumn('total_duration');
            $table->dropColumn('speed');
        });
    }
};
