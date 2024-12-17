<?php
namespace App\Http\Controllers;
use App\Http\Resources\PropertyCategoryResource;
use App\Models\PropertyCategory;
use Illuminate\Http\Request;

class PropertyCategoryController extends Controller
{
    public function index()
    {
        $properties = PropertyCategory::all();
        return response()->json([
            'message' => 'Property categories have been retrieved successfully!',
            'properties' => PropertyCategoryResource::collection($properties),
        ]);
    }
}
