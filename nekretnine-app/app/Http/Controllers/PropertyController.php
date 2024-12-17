<?php
namespace App\Http\Controllers;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;
class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::all();
        return response()->json([
            'message' => 'Properties have been retrieved successfully!',
            'properties' => PropertyResource::collection($properties),
        ]);
    }
    public function show($id)
    {
        $property = Property::with('propertyCategory')->find($id);
        if (!$property) {
            return response()->json([
                'message' => 'Property not found!',
            ], 404);
        }
        return response()->json([
            'message' => 'Property has been retrieved successfully!',
            'property' => new PropertyResource($property),
        ]);
    }
}