<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\Travels\ParticipantsDistanceController;
use App\Http\Controllers\Admin\Travels\TravelsRawDataController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return response()->redirectTo('/login');
});

Route::middleware(['auth', 'verified'])->group(function () {

    // Route::get('/dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->name('dashboard');

    Route::prefix('/travels')->group(function () {

        Route::prefix('/raw-data')->group(function () {
            Route::get('/', [TravelsRawDataController::class, 'index'])->name('travels.raw-data');
            Route::get('/download', [TravelsRawDataController::class, 'download'])->name('travels.raw-data.download');
        });

        Route::prefix('/distance')->group(function () {
            Route::get('/', [ParticipantsDistanceController::class, 'index'])->name('travels.distance');
            Route::get('/download', [ParticipantsDistanceController::class, 'download'])->name('travels.distance.download');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
