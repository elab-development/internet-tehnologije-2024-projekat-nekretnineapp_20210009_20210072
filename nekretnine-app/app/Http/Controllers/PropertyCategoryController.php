<?php

namespace App\Http\Controllers;

use App\Models\PropertyCategory;
use App\Http\Resources\PropertyCategoryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropertyCategoryController extends Controller
{
    /**
     * Update the specified property category.
     */
    public function update(Request $request, $id)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Only admins can access all purchases.'], 403);
        }

        $validated = $request->validate([
            'property_category_name' => 'required|string|max:255',
            'property_category_description' => 'nullable|string|max:1000',
            'property_category_icon' => 'nullable|string|max:255',
        ]);

        $propertyCategory = PropertyCategory::findOrFail($id);

        $propertyCategory->update($validated);

        return new PropertyCategoryResource($propertyCategory);
    }
}

