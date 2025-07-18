<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Purchase;
use App\Models\Property;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    
    /**
     * List all users (admin only).
     */
    public function index()
    {
        $me = Auth::user();
        if (!$me || $me->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::all();
        return response()->json(['users' => $users], 200);
    }

    /**
     * Delete a user and cascade-delete their related purchases & properties.
     */
    public function destroy($id)
    {
        $me = Auth::user();
        if (!$me || $me->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // wrap in transaction
        DB::transaction(function () use ($id) {
            // delete any purchases where this user was buyer or agent
            Purchase::where('fk_buyer_id', $id)
                    ->orWhere('fk_agent_id', $id)
                    ->delete();

            // delete any properties where this user was the agent
            Property::where('fk_agent_id', $id)->delete();

            // finally delete the user
            User::where('id', $id)->delete();
        });

        return response()->json(['message' => 'User and related data deleted'], 200);
    }

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
