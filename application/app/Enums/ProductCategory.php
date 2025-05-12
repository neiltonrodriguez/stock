<?php

namespace App\Enums;

enum ProductCategory: string
{
    case ELETRONICOS = 'Eletrônicos';
    case INFORMATICA = 'Informática';
    case MOVEIS = 'Móveis';
    case ALIMENTOS = 'Alimentos';
    case BEBIDA = 'bebida';
    case LIMPEZA = 'Limpeza';
    case PAPELARIA = 'Papelaria';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function labels(): array
    {
        return array_map(fn($case) => ucfirst($case->value), self::cases());
    }

    public static function getCategories(): array
    {
        return [
            self::ELETRONICOS->value,
            self::INFORMATICA->value,
            self::MOVEIS->value,
            self::ALIMENTOS->value,
            self::BEBIDA->value,
            self::LIMPEZA ->value,
            self::PAPELARIA->value,
        ];
    }
}
