<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::pluck('id', 'name');

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roles['administrador'],
        ]);

        User::create([
            'name' => 'Operador User',
            'email' => 'operador@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roles['operador'],
        ]);

        User::create([
            'name' => 'Usuario Comum',
            'email' => 'usuario@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roles['usuario-comum'],
        ]);
    }
}
