<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Travels\TravelController;
use App\Http\Controllers\Api\Travels\TravelLocationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function (Request $request) {
    return "Carnaval API";
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'info']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::prefix('travels')->group(function () {
        Route::get('/', [TravelController::class, 'list']);
        Route::get('/active', [TravelController::class, 'getActiveTravel']);
        Route::post('/', [TravelController::class, 'create']);
        Route::put('/{id}/finish', [TravelController::class, 'finishTravel']);
        Route::delete('/{id}', [TravelController::class, 'delete']);
    });

    Route::prefix('travel-locations')->group(function () {
        Route::post('/', [TravelLocationController::class, 'create']);
        Route::get('/{travel_id}', [TravelLocationController::class, 'list']);
    });
});
