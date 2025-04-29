<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Vraća sve korisnike koji su agenti.
     * Ovo mogu da vide samo ulogovani korisnici.
     */
    public function getAgents()
    {
        // Provera da li je korisnik ulogovan
        if (!Auth::check()) {
            return response()->json([
                'message' => 'You have to be logged in to access this resource.'
            ], 401);
        }

        // Dohvati sve korisnike sa ulogom 'agent'
        $agents = User::where('role', 'agent')->get();

        // Vraćanje kao resurs kolekcije
        return UserResource::collection($agents);
    }
}
