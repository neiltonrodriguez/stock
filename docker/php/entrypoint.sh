#!/bin/bash

chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Espera o MySQL ficar disponível
echo "⏳ Aguardando o MySQL iniciar..."
until nc -z -v -w30 $DB_HOST 3306
do
  echo "❌ Ainda sem conexão com o MySQL ($DB_HOST:3306), tentando novamente..."
  sleep 5
done

echo "✅ MySQL disponível — executando comandos do Laravel..."

# Verifica se é a primeira execução (se não existe a chave JWT)
if [ ! -f ".jwt_initialized" ]; then
  echo "🔐 Configurando JWT..."
  
  # Publica configurações e gera chave
  php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" --force
  php artisan jwt:secret --force
  
  # Marca como configurado
  touch .jwt_initialized
  echo "✅ JWT configurado com sucesso"
fi

# Roda comandos do Laravel
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force

# Inicia o PHP-FPM
exec php-fpm
