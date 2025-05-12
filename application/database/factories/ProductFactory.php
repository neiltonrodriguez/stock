<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\ProductCategory;

class ProductFactory extends Factory
{
    public function definition()
    {
        $categories = ProductCategory::getCategories();
        $category = $this->faker->randomElement($categories);
        
        return [
            'id' => \Illuminate\Support\Str::uuid(),
            'product_name' => $this->generateProductName($category),
            'description' => $this->faker->sentence(15),
            'quantity_available' => $this->faker->numberBetween(0, 500),
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'category' => $category,
            'sku' => $this->generateSku(),
        ];
    }

    private function generateProductName($category)
    {
        $names = [
            'Eletrônicos' => ['Smartphone ', 'Tablet ', 'TV ', 'Notebook ', 'Fone de Ouvido '],
            'Informática' => ['Mouse ', 'Teclado ', 'Monitor ', 'HD Externo ', 'Webcam '],
            'Móveis' => ['Cadeira ', 'Mesa ', 'Sofá ', 'Estante ', 'Cama '],
            'Alimentos' => ['Arroz ', 'Feijão ', 'Óleo ', 'Açúcar ', 'Macarrão '],
            'Bebidas' => ['Refrigerante ', 'Suco ', 'Água ', 'Cerveja ', 'Vinho '],
            'Limpeza' => ['Detergente ', 'Sabão ', 'Desinfetante ', 'Álcool ', 'Esponja '],
            'Papelaria' => ['Caderno ', 'Caneta ', 'Lápis ', 'Borracha ', 'Grampeador '],
        ];

        $prefix = $this->faker->randomElement($names[$category]);
        return $prefix . $this->faker->word . ' ' . $this->faker->randomElement(['Pro', 'Lite', 'Plus', 'Premium', 'Basic']);
    }

    private function generateSku()
    {
        return strtoupper(
            $this->faker->randomLetter . 
            $this->faker->randomLetter . 
            $this->faker->randomNumber(3) . 
            $this->faker->randomElement(['A', 'B', 'C', 'X', 'Y', 'Z'])
        );
    }
}