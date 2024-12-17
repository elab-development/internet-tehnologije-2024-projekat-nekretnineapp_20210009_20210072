<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

use App\Models\User;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'role' => 'required|string|in:buyer,agent,admin',
            'password' => 'required|string',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);
       $token = $user->createToken('auth_token')->plainTextToken;
       return response()->json([
           'message' => 'User registration completed.',
           'user' => new UserResource($user),
           'token' => $token,
       ], 201); 
        
    }
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if (!Auth::attempt($validated)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        $user = User::where('email', $validated['email'])->first();
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
         $token = $user->createToken('auth_token')->plainTextToken;
         
        return response()->json([
            'message' => 'User logged in successfully.',
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }
   
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'User logged out successfully.']);
    }

    public function resetPassword(Request $request)
    {   
        $request->validate([
            'email' => 'required',
            'new_password' => 'required|string'
        ]);
        $user = User::where('email', $request->email)->first();
        $user = User::where('email', $validated['email'])->first();
    
        if (!$user) {
            return response()->json([
                'message' => 'The email you have entered does not exist.',
            ], 404);
        }
        
        // Postavljanje nove lozinke
        $user->update([
            'password' => Hash::make($validated['new_password']), 
        ]);
    
        return response()->json([
            'message' => 'Your password has been reset.',
        ], 200);
        
    }
}
