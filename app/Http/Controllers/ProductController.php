<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Produk;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Ubah query categories untuk lebih dinamis
        $categories = Kategori::select('id', 'name', 'slug')
            ->whereHas('products', function ($query) {
                $query->where('is_active', true);
            })
            ->get();

        $query = Produk::with(['kategori', 'reviews'])
            ->where('is_active', true);

        // Perbaiki filtering kategori
        if ($request->category) {
            $category = Kategori::where('slug', $request->category)->firstOrFail();
            $query->where('kategori_id', $category->id);
        }

        // Tambahkan filter tambahan
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%");
            });
        }

        // Filter harga dengan range
        if ($request->min_price && $request->max_price) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        } elseif ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        } elseif ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting yang lebih komprehensif
        $sortOptions = [
            'latest' => ['column' => 'created_at', 'direction' => 'desc'],
            'price_low' => ['column' => 'price', 'direction' => 'asc'],
            'price_high' => ['column' => 'price', 'direction' => 'desc'],
            'popular' => ['column' => 'reviews_count', 'direction' => 'desc'],
            'rating' => ['column' => 'average_rating', 'direction' => 'desc']
        ];

        $sort = $request->sort ?? 'latest';
        $selectedSort = $sortOptions[$sort] ?? $sortOptions['latest'];

        if ($sort === 'popular') {
            $query->withCount('reviews')->orderBy('reviews_count', $selectedSort['direction']);
        } else {
            $query->orderBy($selectedSort['column'], $selectedSort['direction']);
        }

        $products = $query->paginate(12)
            ->withQueryString() // Penting untuk mempertahankan query string
            ->through(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'price' => $product->price,
                    'stock' => $product->stock,
                    'kategori' => [
                        'id' => $product->kategori->id,
                        'name' => $product->kategori->name,
                        'slug' => $product->kategori->slug,
                    ],
                    'image_url' => $product->image_url,
                    'average_rating' => $product->average_rating,
                    'reviews_count' => $product->reviews_count
                ];
            });

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search', 'min_price', 'max_price', 'sort'])
        ]);
    }

    public function show(Request $request, Produk $product)
    {
        if (!$product->is_active) {
            abort(404);
        }

        // Increment view count
        // $product->increment('views');

        // Eager load relationships
        $product->load(['kategori', 'reviews.user']);

        // Get related products
        $relatedProducts = Cache::remember("related_products_{$product->id}", 3600, function () use ($product) {
            return Produk::with('kategori')
                ->where('kategori_id', $product->kategori_id)
                ->where('id', '!=', $product->id)
                ->where('is_active', true)
                ->take(4)
                ->get()
                ->map(function ($related) {
                    return [
                        'id' => $related->id,
                        'name' => $related->name,
                        'slug' => $related->slug,
                        'price' => $related->price,
                        'image_url' => $related->image_url,
                        'average_rating' => $related->average_rating,
                        'kategori' => [
                            'name' => $related->kategori->name
                        ]
                    ];
                });
        });

        // Get review statistics
        $reviewStats = [
            'average' => round($product->average_rating, 1),
            'total' => $product->reviews_count,
            'distribution' => Review::where('produk_id', $product->id)
                ->selectRaw('rating, COUNT(*) as count')
                ->groupBy('rating')
                ->get()
                ->pluck('count', 'rating')
                ->toArray()
        ];

        return Inertia::render('Products/Show', [
            'product' => array_merge($product->toArray(), [
                'image_url' => $product->image_url,
                'formatted_price' => 'Rp ' . number_format($product->price, 0, ',', '.'),
                'review_stats' => $reviewStats
            ]),
            'relatedProducts' => $relatedProducts,
            'can_review' => $request->user() ?
                !$product->reviews()->where('user_id', $request->user()->id)->exists() :
                false
        ]);
    }

    public function featured()
    {
        return Cache::remember('featured_products', 3600, function () {
            return Produk::with(['kategori'])
                ->where('is_active', true)
                ->where('is_featured', true) // Tambahkan kolom is_featured jika diperlukan
                ->orWhere(function ($query) {
                    $query->where('is_active', true)
                        ->orderBy('average_rating', 'desc');
                })
                ->take(3)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'price' => $product->price,
                        'image_url' => $product->image_url,
                        'kategori' => $product->kategori->name,
                        'average_rating' => $product->average_rating,
                        'description' => str()->limit($product->description, 100)
                    ];
                });
        });
    }

    public function storeReview(Request $request, Produk $product)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:500'
        ]);

        // Check if user already reviewed
        if ($product->reviews()->where('user_id', $request->user()->id)->exists()) {
            return back()->withErrors(['error' => 'You have already reviewed this product']);
        }

        $product->reviews()->create([
            'user_id' => $request->user()->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment']
        ]);

        // Clear related caches
        Cache::forget("related_products_{$product->id}");
        Cache::forget('featured_products');

        return back()->with('success', 'Review added successfully');
    }
}
