<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;

class ProdukController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products/Index');
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Kategori::select('id', 'name')->get()
        ]);
    }

    public function data()
    {
        try {
            $products = Produk::with('kategori')->select('produks.*');

            return DataTables::of($products)
                ->addIndexColumn()
                ->addColumn('kategori_name', function ($product) {
                    return $product->kategori->name ?? '-';
                })
                ->addColumn('image_url', function ($product) {
                    return $product->image_url;
                })
                ->addColumn('description', function ($product) {
                    return $product->description;
                })
                ->addColumn('formatted_price', function ($product) {
                    return 'Rp ' . number_format($product->price, 0, ',', '.');
                })
                ->addColumn('is_active', function ($product) {
                    return $product->is_active;
                })
                ->addColumn('actions', function ($product) {
                    return [
                        'edit_url' => route('admin.products.edit', $product),
                        'delete_url' => route('admin.products.destroy', $product),
                    ];
                })
                ->toJson();
        } catch (\Exception $e) {
            \Log::error('DataTables Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategoris,id',
            'name' => 'required|string|max:255|unique:produks',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        Produk::create($validated);

        return redirect()->route('admin.products.index')
            ->with('message', [
                'type' => 'success',
                'text' => 'Product created successfully'
            ]);
    }

    public function edit(Produk $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load('kategori'),
            'categories' => Kategori::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, Produk $product)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategoris,id',
            'name' => 'required|string|max:255|unique:produks,name,' . $product->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            // Store new image
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('message', [
                'type' => 'success',
                'text' => 'Product updated successfully'
            ]);
    }

    public function destroy(Produk $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
