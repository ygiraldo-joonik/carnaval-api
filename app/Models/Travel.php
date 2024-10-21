<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Travel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'travels';

    protected $fillable = [
        'user_id',
        'name',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function locations()
    {
        return $this->hasMany(TravelLocation::class);
    }

    const RAW_DATA_QUERY = "
        select 
            t.id,
            t.created_at as started_at,
            t.finished_at,
            TIMESTAMPDIFF(MINUTE, t.created_at, t.finished_at) AS minutes_difference,
            u.id as user_id, 
            u.name as user_name, 
            u.email as user_email,
            tl.id as location_id,
            tl.longitude,
            tl.latitude,
            tl.created_at as location_at
        from travels t 
        inner join travel_locations tl on tl.travel_id = t.id 
        inner join users u on t.user_id = u.id 
    ";

    public static function getRawData($date = null)
    {
        $query = self::RAW_DATA_QUERY;

        if ($date) {
            $query .= " where date(t.created_at) = '$date'";
        }

        $query .= " order by tl.created_at desc";

        return DB::select($query);
    }

    public static function getRawDataPaginated(
        $date = null,
        int $page = 1,
        int $perPage = 15
    ) {


        // Calculate the offset
        $offset = ($page - 1) * $perPage;

        // Get the total count of items for pagination
        $totalCount = DB::table('travel_locations')->count();


        $query = self::RAW_DATA_QUERY;

        if ($date) {
            $query .= " where date(t.created_at) = '$date'";
        }

        $query .= " order by tl.created_at desc LIMIT ?, ?";

        // Fetch the paginated results
        $travelsRawData = DB::select($query, [$offset, $perPage]);



        // Create a paginator instance
        $travels = new \Illuminate\Pagination\LengthAwarePaginator(
            $travelsRawData,
            $totalCount,
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $travels;
    }
}
