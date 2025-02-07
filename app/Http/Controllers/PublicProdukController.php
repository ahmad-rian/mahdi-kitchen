<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicProdukController extends Controller
{
    public function index(Request $request)
    {
        $query = Produk::with('kategori')
            ->where('is_active', true);

        // Search functionality
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('description', 'like', "%{$request->search}%");
        }

        // Price filter
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sort products
        switch ($request->sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->latest();
        }

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => Kategori::withCount('products')->get(),
            'filters' => [
                'search' => $request->search,
                'min_price' => $request->min_price,
                'max_price' => $request->max_price,
                'sort' => $request->sort,
            ]
        ]);
    }

    public function show(Produk $produk)
    {
        // Load the product with its relationships
        $produk->load(['kategori', 'reviews' => function ($query) {
            $query->where('is_verified', true)
                ->with('user')
                ->latest();
        }]);

        // Get related products from the same category
        $relatedProducts = Produk::with('kategori')
            ->where('kategori_id', $produk->kategori_id)
            ->where('id', '!=', $produk->id)
            ->where('is_active', true)
            ->take(3)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $produk,
            'relatedProducts' => $relatedProducts,
            'canReview' => auth()->check()
        ]);
    }

    public function byCategory(Kategori $kategori, Request $request)
    {
        $query = $kategori->produks()
            ->with('kategori')
            ->where('is_active', true);

        // Apply the same filters as the index method
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('description', 'like', "%{$request->search}%");
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        switch ($request->sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->latest();
        }

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Products/Category', [
            'category' => $kategori,
            'products' => $products,
            'categories' => Kategori::withCount('produks')->get(),
            'filters' => [
                'search' => $request->search,
                'min_price' => $request->min_price,
                'max_price' => $request->max_price,
                'sort' => $request->sort,
            ]
        ]);
    }
}
