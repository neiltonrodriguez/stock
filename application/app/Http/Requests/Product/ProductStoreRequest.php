<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_name'        => ['required', 'string', 'max:255'],
            'description'         => ['nullable', 'string', 'max:1000'],
            'quantity_available'  => ['required', 'integer', 'min:0'],
            'price'               => ['required', 'numeric', 'min:0'],
            'category'            => ['required', 'string', 'max:255'],
            'sku'                 => ['required', 'string', 'max:255', 'unique:products,sku'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_name.required' => 'O nome do produto é obrigatório.',
            'price.required' => 'O preço é obrigatório.',
            'sku.unique' => 'Este SKU já está em uso.',
        ];
    }
}
