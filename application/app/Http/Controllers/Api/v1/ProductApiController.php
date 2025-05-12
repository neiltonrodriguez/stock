<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\Models\Product;
use App\Enums\ProductCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProductApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Product::class);
        
        $query = Product::query();
        
        if ($request->has('name') && $request->name) {
            $query->where('product_name', 'like', '%'.$request->name.'%');
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

        return response()->json([
            'data' => $query->paginate(10),
            'can' => [
                'create' => Gate::allows('create', Product::class),
                'update' => Gate::allows('updateAny', Product::class),
                'delete' => Gate::allows('deleteAny', Product::class),
            ],
            'categories' => ProductCategory::values(),
        ]);
    }

    public function store(ProductStoreRequest $request): JsonResponse
    {
        $this->authorize('create', Product::class);
        
        $product = Product::create($request->validated());
        
        return response()->json([
            'message' => 'Produto criado com sucesso!',
            'data' => $product
        ], 201);
    }

    public function show(Product $product): JsonResponse
    {
        $this->authorize('view', $product);
        
        return response()->json([
            'data' => $product,
            'can' => [
                'update' => Gate::allows('update', $product),
                'delete' => Gate::allows('delete', $product),
            ]
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product): JsonResponse
    {
        $this->authorize('update', $product);
        
        $product->update($request->validated());
        
        return response()->json([
            'message' => 'Produto atualizado com sucesso!',
            'data' => $product
        ]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->authorize('delete', $product);
        
        $product->delete();
        
        return response()->json([
            'message' => 'Produto removido com sucesso!'
        ]);
    }

    public function categories(): JsonResponse
    {
        return response()->json([
            'data' => ProductCategory::values()
        ]);
    }
}