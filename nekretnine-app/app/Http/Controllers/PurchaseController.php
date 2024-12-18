<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Http\Resources\PurchaseResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PurchaseController extends Controller
{


    public function index()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Only admins can access all purchases.'], 403);
        }

        $purchases = Purchase::with(['buyer', 'agent', 'property'])->get();

        return PurchaseResource::collection($purchases);
    }


    public function getMyPurchases()
    {
        $user = Auth::user();

        if (!$user || $user->role !== 'buyer') {
            return response()->json(['message' => 'Unauthorized. Only buyers can access their purchases.'], 403);
        }

        $purchases = Purchase::where('fk_buyer_id', $user->id)->with(['property', 'agent'])->get();

        return PurchaseResource::collection($purchases);
    }


    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user || $user->role !== 'buyer') {
            return response()->json(['message' => 'Unauthorized. Only buyers can create purchases.'], 403);
        }

        $validated = $request->validate([
            'purchase_notes' => 'nullable|string|max:255',
            'purchase_status' => 'required|string|in:pending,completed,canceled',
            'purchase_price' => 'required|numeric|min:0',
            'purchase_payment_type' => 'required|string|in:cash,credit_card',
            'purchase_date' => 'required|date',
            'fk_agent_id' => 'required|exists:users,id',
            'fk_property_id' => 'required|exists:properties,id',
        ]);

        $purchase = Purchase::create([
            ...$validated,
            'fk_buyer_id' => $user->id,
        ]);

        return new PurchaseResource($purchase);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        if (!$user || $user->role !== 'buyer') {
            return response()->json(['message' => 'Unauthorized. Only buyers can delete their purchases.'], 403);
        }

        $purchase = Purchase::where('id', $id)->where('fk_buyer_id', $user->id)->first();

        if (!$purchase) {
            return response()->json(['message' => 'You can only delete your own purchases.'], 403);
        }

        $purchase->delete();

        return response()->json(['message' => 'Purchase deleted successfully.']);
    }
}
