<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    // Relasi ke category
    // app/Models/Produk.php
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    // Relasi ke reviews
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    // Auto generate slug
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            $product->slug = str()->slug($product->name);
        });
    }
}
