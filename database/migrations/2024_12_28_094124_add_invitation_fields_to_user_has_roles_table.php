<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    protected $tableName;

    public function __construct()
    {
        $tableNames = config('permission.table_names');
        $this->tableName = $tableNames['model_has_roles'];
    }


    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table($this->tableName, function (Blueprint $table) {
            $table->string('invitation_token')->nullable()->unique();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('declined_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table($this->tableName, function (Blueprint $table) {
            $table->dropColumn('invitation_token');
            $table->dropColumn('accepted_at');
            $table->dropColumn('declined_at');
            $table->dropColumn('revoked_at');
        });
    }
};
