<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Kategori extends Model

{

    protected $table = 'kategoris';

    protected $fillable = ['name', 'slug', 'description'];

    // Relasi ke products
    public function products(): HasMany
    {
        return $this->hasMany(Produk::class);
    }

    // // Auto generate slug
    // protected static function boot()
    // {
    //     parent::boot();
    //     static::creating(function ($category) {
    //         $category->slug = str()->slug($category->name);
    //     });
    // }
}
