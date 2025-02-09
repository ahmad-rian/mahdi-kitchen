<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\KategoriController;
use App\Http\Controllers\Admin\ProdukController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'featuredProducts' => \App\Models\Produk::with('kategori')
            ->where('is_active', true)
            ->latest()
            ->take(3)
            ->get(),
        'reviews' => \App\Models\Review::with('user')
            ->where('is_verified', true)
            ->latest()
            ->take(3)
            ->get(),
        'categories' => \App\Models\Kategori::withCount('products')
            ->get()
    ]);
})->name('welcome');;

Route::get('storage/products/{filename}', function ($filename) {
    $path = storage_path('app/public/products/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Content-Type' => mime_content_type($path),
        'Cache-Control' => 'public, max-age=3600',
    ]);
})->where('filename', '.*');

Route::get('/about', function () {
    return Inertia::render('About', []);
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact', []);
})->name('contact');


Route::get('products', [ProductController::class, 'index'])->name('products.index');
Route::get('products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('api/featured-products', [ProductController::class, 'featured'])->name('api.products.featured');



// Authenticated User Routes
Route::middleware('auth')->group(function () {


    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/user/profile', [UserProfileController::class, 'edit'])->name('user-profile.edit');
    Route::patch('/user/profile', [UserProfileController::class, 'update'])->name('user-profile.update');
    Route::put('/user/profile/password', [UserProfileController::class, 'updatePassword'])->name('user-profile.password.update');
    Route::delete('/user/profile', [UserProfileController::class, 'destroy'])->name('user-profile.destroy');

    // User Reviews

    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

    Route::post('products/{product}/reviews', [ProductController::class, 'storeReview'])
        ->name('products.reviews.store');

    Route::post('products/{product}/reviews', [ReviewController::class, 'store'])->name('products.reviews.store');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Categories Management
    Route::get('/categories/data', [KategoriController::class, 'getData'])->name('categories.data');
    Route::resource('categories', KategoriController::class);

    // Products Management
    Route::get('/products/data', [ProdukController::class, 'data'])->name('products.data');
    Route::resource('products', ProdukController::class);

    // Reviews Management
    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::get('/reviews/data', [ReviewController::class, 'getData'])->name('reviews.data');
    Route::post('/reviews/{review}/verify', [ReviewController::class, 'verify'])->name('reviews.verify');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

    // Users Management
    Route::get('/users/data', [UserController::class, 'getData'])->name('users.data');
    Route::post('/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
    Route::resource('users', UserController::class);
});

require __DIR__ . '/auth.php';
