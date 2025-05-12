<?php

namespace App\Http\Requests\Product;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'product_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'], 
            'quantity_available' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'between:0,99999999.99'], 
            'category' => ['required', 'string', 'max:255'],
            'sku' => [
                'required', 
                'string', 
                'max:20', 
                Rule::unique(Product::class)->ignore($this->route('product.index')->id ?? $this->product->id)
            ],
        ];
    }
}