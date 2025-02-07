<?php

namespace App\Services;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function compressAndSave($image, $path = 'products', $width = 800)
    {
        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $fullPath = storage_path('app/public/' . $path);

        if (!file_exists($fullPath)) {
            mkdir($fullPath, 0775, true);
        }

        // Save original
        $image->storeAs('public/' . $path, $filename);

        // Create compressed version
        $img = Image::make($image->getRealPath());
        $img->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $compressedPath = storage_path('app/public/' . $path . '/compressed_' . $filename);
        $img->save($compressedPath, 80);

        // Set permissions
        chmod($compressedPath, 0664);

        return $path . '/' . $filename;
    }

    public function delete($path)
    {
        if (!$path) return;

        $paths = [
            "public/{$path}",
            "public/" . dirname($path) . "/compressed_" . basename($path)
        ];

        foreach ($paths as $filePath) {
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
        }
    }
}
