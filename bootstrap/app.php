<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
        ]);

        $middleware->redirectGuestsTo('/');
        // Redirect admin ke dashboard setelah login
        $middleware->redirectUsersTo(function ($request) {
            return $request->user()->role === 'admin' ? '/admin/dashboard' : '/';
        });
    })
    // ->withProviders([
    //     \Intervention\Image\ImageServiceProvider::class,
    // ])
    // ->withBindings([
    //     'Image' => \Intervention\Image\Facades\Image::class,
    // ])
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
