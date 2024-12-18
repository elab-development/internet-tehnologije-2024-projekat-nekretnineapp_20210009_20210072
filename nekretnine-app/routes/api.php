<?php
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PropertyCategoryController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/reset-password', [AuthController::class, 'resetPassword']);


Route::get('/properties', [PropertyController::class, 'index']); 
Route::get('/properties/{id}', [PropertyController::class, 'show']); 


Route::middleware('auth:sanctum')->group(function () {


    Route::get('/agents', [UserController::class, 'getAgents']);


    Route::post('/properties', [PropertyController::class, 'store']); 
    Route::patch('/properties/{id}', [PropertyController::class, 'update']); 
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy']); 

    Route::get('/purchases', [PurchaseController::class, 'index']);

    Route::get('/my-purchases', [PurchaseController::class, 'getMyPurchases']); 
    Route::post('/purchases', [PurchaseController::class, 'store']); 
    Route::delete('/purchases/{id}', [PurchaseController::class, 'destroy']); 

    Route::put('/property-categories/{id}', [PropertyCategoryController::class, 'update']);

    Route::post('/logout', [AuthController::class, 'logout']);
});