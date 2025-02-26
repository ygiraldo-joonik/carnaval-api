<?php

use App\Http\Controllers\Api\Admin\ElementController;
use App\Http\Controllers\Api\Admin\BlockController;
use App\Http\Controllers\Api\Admin\ElementTypeController;
use App\Http\Controllers\Api\Admin\OrganizationController;
use App\Http\Controllers\Api\Admin\ParadeController;
use App\Http\Controllers\Api\Admin\UserController;
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

Route::options('{any}', function (Request $request) {
    return response()->json([], 200, [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers' => 'Content-Type, X-Requested-With',
    ]);
})->where('any', '.*');

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

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'all']);
    });

    Route::prefix('organizations')->group(function () {
        Route::get('/', [OrganizationController::class, 'byUser']);
    });

    // parades
    Route::prefix('parades')->group(function () {
        Route::get('/', [ParadeController::class, 'list']);
        Route::get('/{id}', [ParadeController::class, 'find']);
        Route::get('/{id}/passed', [ParadeController::class, 'findAndMarkElementsPassed']);
        Route::get('/{id}/distance', [ParadeController::class, 'distance']);
        Route::get('/{id}/elements-position', [ParadeController::class, 'elementsPosition']);
        Route::get('/{id}/elements-analisys/{element_id?}', [ParadeController::class, 'elementsAnalisys']);
        Route::post('/', [ParadeController::class, 'store']);
        Route::put('/{id}', [ParadeController::class, 'update']);
        Route::delete('/{id}', [ParadeController::class, 'delete']);
    });

    // block
    Route::prefix('blocks')->group(function () {
        Route::post('/', [BlockController::class, 'store']);
        Route::put('/order', [BlockController::class, 'updateOrder']);
        Route::put('/{id}', [BlockController::class, 'update']);
        Route::delete('/{id}', [BlockController::class, 'delete']);
    });

    Route::prefix('element-types')->group(function () {
        Route::get('/', [ElementTypeController::class, 'list']);
        Route::get('/{id}', [ElementTypeController::class, 'find']);
        Route::post('/', [ElementTypeController::class, 'store']);
        Route::put('/{id}', [ElementTypeController::class, 'update']);
        Route::delete('/{id}', [ElementTypeController::class, 'delete']);
    });

    Route::prefix('elements')->group(function () {
        Route::post('/', [ElementController::class, 'store']);
        Route::put('/order', [ElementController::class, 'updateOrder']);
        Route::put('/position', [ElementController::class, 'updateElementPosition']);
        Route::put('/passed', [ElementController::class, 'registerElementPassedUser']);
        Route::post('{parade_id}/import-passed', [ElementController::class, 'bulkRegiserElementsPassed']);
        Route::post('{block_id}/bulk-create', [ElementController::class, 'bulkCreateElements']);

        Route::put('/{id}', [ElementController::class, 'update']);
        Route::delete('/{id}', [ElementController::class, 'delete']);
    });
});
