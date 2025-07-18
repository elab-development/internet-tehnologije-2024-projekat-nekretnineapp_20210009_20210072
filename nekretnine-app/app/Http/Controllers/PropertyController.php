<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Http\Resources\PropertyResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    /**
     * Prikaz svih nekretnina sa paginacijom.
     */
    public function index(Request $request)
    {
        // Dohvati 'per_page' iz query parametara ili postavi podrazumevano na 5
        $perPage = $request->query('per_page', 5);
    
        // Paginiši sve nekretnine
        $properties = Property::paginate($perPage);
    
        // Vraćanje rezultata u željenom formatu
        return response()->json([
            'message' => 'All properties retrieved successfully!',
            'properties' => PropertyResource::collection($properties->items()),
            'pagination' => [
                'current_page' => $properties->currentPage(),
                'last_page' => $properties->lastPage(),
                'per_page' => $properties->perPage(),
                'total' => $properties->total(),
            ],
        ]);
    }

    /**
     * Prikaz određene nekretnine na osnovu prosleđenog ID-a.
     */
    public function show($id)
    {
        $property = Property::findOrFail($id);

        return new PropertyResource($property);
    }

    /**
     * Kreiranje nove nekretnine - samo agent može.
     */
    public function store(Request $request)
    {
        // Provera da li je korisnik agent
        if (!Auth::check() || Auth::user()->role !== 'agent') {
            return response()->json(['message' => 'Only agents can create properties.'], 403);
        }

        $validated = $request->validate([
            'property_name'             => 'required|string|max:255',
            'property_price'            => 'required|numeric|min:0',
            'property_description'      => 'required|string',
            'property_image_link'       => 'required|url',
            'property_360_image_link'   => 'nullable|url',
            'fk_property_category_id'   => 'required|exists:property_categories,id',
            'property_latitude'         => 'nullable|numeric',
            'property_longitude'        => 'nullable|numeric',
        ]);

        // Dodajemo fk_agent_id na osnovu trenutno prijavljenog agenta
        $validated['fk_agent_id'] = Auth::id();

        $property = Property::create($validated);

        return new PropertyResource($property);
    }

    /**
     * Ažuriranje isključivo svoje nekretnine.
     */
    public function update(Request $request, $id)
    {
        if (!Auth::check() || Auth::user()->role !== 'agent') {
            return response()->json(['message' => 'Only agent can update the data of the specific property!'], 403);
        }

        $property = Property::findOrFail($id);

        $validated = $request->validate([
            'property_price' => 'sometimes|numeric|min:0'
        ]);

        $property->update($validated);

        return new PropertyResource($property);
    }

    /**
     * Brisanje isključivo svoje nekretnine.
     */
    public function destroy($id)
    {
        if (!Auth::check() || Auth::user()->role !== 'agent') {
            return response()->json(['message' => 'Only agent can delete a property.'], 403);
        }

        $property = Property::findOrFail($id);

        $property->delete();

        return response()->json(['message' => 'Property has been deleted successfully!']);
    }
}
