<?php

use App\Http\Controllers\Admin\ElementController;
use App\Http\Controllers\Admin\ElementTypeController;
use App\Http\Controllers\Admin\ParadeController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Api\Admin\BlockController as ApiBlockController;
use App\Http\Controllers\Api\Admin\ElementController as ApiElementController;
use App\Http\Controllers\Api\Admin\ElementTypeController as ApiElementTypeController;
use App\Http\Controllers\Api\Admin\ParadeController as ApiParadeController;
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
    // })->name('dashboard');s

    Route::prefix('element-types')->group(function () {
        Route::get('/', [ElementTypeController::class, 'index'])->name('element-types.index');
        Route::post('/', [ApiElementTypeController::class, 'store'])->name('element-types.store');
        Route::put('/{id}', [ApiElementTypeController::class, 'update'])->name('element-types.update');
        Route::delete('/{id}', [ApiElementTypeController::class, 'delete'])->name('element-types.delete');
    });

    Route::prefix('parades')->group(function () {
        Route::get('/', [ParadeController::class, 'index'])->name('parades.index');
        Route::post('/', [ApiParadeController::class, 'store'])->name('parades.store');
        Route::put('/{id}', [ApiParadeController::class, 'update'])->name('parades.update');
        Route::delete('/{id}', [ApiParadeController::class, 'delete'])->name('parades.delete');

        Route::get('/{id}/control', [ParadeController::class, 'control'])->name('parades.control');
        Route::get('/{id}', [ElementController::class, 'index'])->name('parades.elements');
    });


    Route::prefix('blocks')->group(function () {
        Route::post('/', [ApiBlockController::class, 'store'])->name('blocks.store');
        Route::put('/order', [ApiBlockController::class, 'updateOrder'])->name('blocks.updateOrder');
        Route::put('/{id}', [ApiBlockController::class, 'update'])->name('blocks.update');
        Route::delete('/{id}', [ApiBlockController::class, 'delete'])->name('blocks.delete');
    });

    Route::prefix('elements')->group(function () {
        Route::post('/', [ApiElementController::class, 'store'])->name('elements.store');
        Route::put('/order', [ApiElementController::class, 'updateOrder'])->name('elements.updateOrder');
        Route::put('/position', [ApiElementController::class, 'updateElementPosition'])->name('elements.updatePosition');
        Route::put('/{id}', [ApiElementController::class, 'update'])->name('elements.update');
        Route::delete('/{id}', [ApiElementController::class, 'delete'])->name('elements.delete');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
