<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Product $product): bool
    {
         return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('administrador');
    }

    public function update(User $user, Product $product): bool
    {
        return $user->hasRole('administrador') || $user->hasRole('operador');
    }

    public function delete(User $user, Product $product): bool
    {
        return $user->hasRole('administrador');
    }

    public function deleteAny(User $user): bool
    {
        return $user->hasRole('administrador');
    }

    public function updateAny(User $user)
    {
        return $user->hasRole('administrador') || $user->hasRole('operador');
    }
}
