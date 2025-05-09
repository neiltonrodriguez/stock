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

# Roda comandos do Laravel
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force

# Inicia o PHP-FPM
exec php-fpm
