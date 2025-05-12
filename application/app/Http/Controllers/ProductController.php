<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\ProductUpdateRequest;
use App\Http\Requests\Product\ProductStoreRequest;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Enums\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Product::class);
        
        $query = Product::query();
        
        if ($request->has('name') && $request->name) {
            $query->where('product_name', 'like', '%' . $request->name . '%');
        }
        
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }
        
        if ($request->has('min_price') && $request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price') && $request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }
        
        return Inertia::render('Product/Product', [
            'products' => $query->paginate(10),
            'filters' => $request->only(['name', 'category', 'min_price', 'max_price']),
            'can' => [
                'create' => Gate::allows('create', Product::class),
                'update' => Gate::allows('updateAny', Product::class),
                'delete' => Gate::allows('deleteAny', Product::class),
            ],
            'auth' => $this->getAuthData(),
            'categories' => ProductCategory::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Product::class);
        
        return Inertia::render('Product/Create', [
            'auth' => $this->getAuthData(),
            'categories' => ProductCategory::values(),
        ]);
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $product = Product::create($request->validated());

        return redirect()->route('product.index')
            ->with('success', 'Produto criado com sucesso!');
    }

    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);
        
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'auth' => $this->getAuthData()
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);
        
        $product->update($request->validated());
        
        return redirect()->route('product.index')
               ->with('success', 'Item do estoque atualizado com sucesso.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->authorize('delete', $product);
        
        $product->delete();
        
        return redirect()->route('product.index')
               ->with('success', 'Item do estoque removido com sucesso.');
    }

    protected function getAuthData(): array
    {
        return [
            'user' => auth()->user() ? [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ] : null
        ];
    }
}