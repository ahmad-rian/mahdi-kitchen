<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;

class ReviewController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reviews/Index');
    }

    public function getData()
    {
        $reviews = Review::with(['user', 'product']);

        return DataTables::of($reviews)
            ->addColumn('user_name', function ($review) {
                return $review->user->name;
            })
            ->addColumn('product_name', function ($review) {
                return $review->product->name;
            })
            ->addColumn('created_at_formatted', function ($review) {
                return $review->created_at->format('d M Y H:i');
            })
            ->addColumn('actions', function ($review) {
                return [
                    'verify_url' => route('admin.reviews.verify', $review),
                    'delete_url' => route('admin.reviews.destroy', $review),
                ];
            })
            ->addColumn('rating_stars', function ($review) {
                return str_repeat('⭐', $review->rating);
            })
            ->make(true);
    }

    public function verify(Review $review)
    {
        $review->update([
            'is_verified' => !$review->is_verified
        ]);

        return back()->with(
            'success',
            $review->is_verified ?
                'Review has been verified' :
                'Review verification has been removed'
        );
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return back()->with('success', 'Review deleted successfully');
    }

    // Method untuk frontend user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:1000',
        ]);

        $review = $request->user()->reviews()->create([
            ...$validated,
            'is_verified' => false // default unverified
        ]);

        return back()->with('success', 'Review submitted successfully');
    }
}
