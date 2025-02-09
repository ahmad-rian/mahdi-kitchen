<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Produk extends Model
{
    protected $fillable = [
        'kategori_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'stock' => 'integer'
    ];

    protected $appends = [
        'image_url',
        'average_rating',
        'reviews_count'
    ];

    // Accessor untuk image_url
    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    // Accessor untuk average_rating
    public function getAverageRatingAttribute(): float
    {
        return $this->reviews()->avg('rating') ?? 0.0;
    }

    // Accessor untuk reviews_count
    public function getReviewsCountAttribute(): int
    {
        return $this->reviews()->count();
    }

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'produk_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            $product->slug = str()->slug($product->name);
        });
    }
}
