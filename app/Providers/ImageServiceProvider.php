<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Intervention\Image\ImageServiceProvider as InterventionImageServiceProvider;

class ImageServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->register(InterventionImageServiceProvider::class);
    }

    public function boot(): void
    {
        // Optional: Register facades
        if (!class_exists('Image')) {
            class_alias(\Intervention\Image\Facades\Image::class, 'Image');
        }
    }
}
