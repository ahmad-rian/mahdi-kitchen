<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Str;

class KategoriController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Categories/Index');
    }

    public function getData()
    {
        $categories = Kategori::query();

        return DataTables::of($categories)
            ->addIndexColumn()
            ->addColumn('actions', function ($category) {
                return [
                    'edit_url' => route('admin.categories.edit', $category),
                    'delete_url' => route('admin.categories.destroy', $category),
                ];
            })
            ->rawColumns(['actions'])
            ->make(true);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:kategoris',
            'description' => 'nullable|string|max:1000',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Kategori::create($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Kategori berhasil ditambahkan');
    }

    public function edit(Kategori $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Kategori $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:kategoris,name,' . $category->id,
            'description' => 'nullable|string|max:1000',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy(Kategori $category)
    {
        try {
            if ($category->products()->exists()) {
                return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki produk');
            }

            $category->delete();

            return back()->with('success', 'Kategori berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus kategori');
        }
    }
}
