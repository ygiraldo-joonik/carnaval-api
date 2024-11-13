<?php

namespace Database\Seeders;

use App\Models\Travel;
use Illuminate\Database\Seeder;

class NormalizeTravelsFinishhDateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        $travels = Travel::where('status', 2)->whereNull('finished_at')->get();

        foreach ($travels as $travel) {
            $travel->finished_at = $travel->updated_at;
            $travel->save();
        }
    }
}
