<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::post('/adduser', [UserController::class, 'addUser']);

Route::get('/fetchuserdata', [UserController::class, 'fetchUserData']);

Route::get('/fetchroles', [RolesController::class, 'fetchRoles']);

Route::inertia('/', 'Approute');

Route::inertia('/{path?}', 'Approute')->where('path', '.*');

