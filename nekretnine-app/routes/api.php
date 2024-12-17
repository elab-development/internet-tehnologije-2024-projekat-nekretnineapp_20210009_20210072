<?php
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyCategoryController;
use App\Http\Controllers\PropertyController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/property-categories', [PropertyCategoryController::class, 'index']);
Route::resource('properties', PropertyController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});