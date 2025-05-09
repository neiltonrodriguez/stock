<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            [
                'name' => 'administrador',
                'description' => 'Pode criar, editar e excluir produtos.',
            ],
            [
                'name' => 'operador',
                'description' => 'Pode visualizar e atualizar o estoque, mas não pode criar ou excluir produtos.',
            ],
            [
                'name' => 'usuario-comum',
                'description' => 'Pode apenas visualizar os produtos.',
            ],
        ]);
    }
}
