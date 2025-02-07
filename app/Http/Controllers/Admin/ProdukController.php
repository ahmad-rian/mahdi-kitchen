<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Produk;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;

class ProdukController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

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

    public function getData()
    {
        $products = Produk::with('kategori')->select('produks.*');

        return DataTables::of($products)
            ->addColumn('kategori_name', function ($product) {
                return $product->kategori->name ?? '-';
            })
            ->addColumn('image_url', function ($product) {
                if (!$product->image) return '';

                $pathInfo = pathinfo($product->image);
                $compressedPath = $pathInfo['dirname'] . '/compressed_' . $pathInfo['basename'];

                // Gunakan asset() helper
                return asset('storage/' . $compressedPath);
            })
            ->addColumn('formatted_price', function ($product) {
                return 'Rp ' . number_format($product->price, 0, ',', '.');
            })
            ->addColumn('status_badge', function ($product) {
                $statusClass = $product->is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
                return '<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ' . $statusClass . '">'
                    . ($product->is_active ? 'Active' : 'Inactive') .
                    '</span>';
            })
            ->addColumn('actions', function ($product) {
                return [
                    'edit_url' => route('admin.products.edit', $product),
                    'delete_url' => route('admin.products.destroy', $product),
                ];
            })
            ->rawColumns(['status_badge'])
            ->make(true);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategoris,id',
            'name' => 'required|string|max:255|unique:produks',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|max:10240', // max 2MB
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $this->imageService->compressAndSave($request->file('image'));
        }

        Produk::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully');
    }

    public function edit(Produk $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => array_merge($product->toArray(), [
                'image_url' => $product->image ? Storage::url($product->image) : null
            ]),
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
            'image' => 'nullable|image|max:10240', // max 2MB
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($product->image) {
                $this->imageService->delete($product->image);
            }
            // Upload gambar baru
            $validated['image'] = $this->imageService->compressAndSave($request->file('image'));
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully');
    }

    public function destroy(Produk $product)
    {
        // Hapus gambar jika ada
        if ($product->image) {
            $this->imageService->delete($product->image);
        }

        // Hapus produk
        $product->delete();

        return back()->with('success', 'Product deleted successfully');
    }
}
