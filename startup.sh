#!/bin/bash

# Wait for MySQL to be ready
while ! mysqladmin ping -h"mysql" -u"laraveluser" -p"laravelpass" --silent; do
    sleep 1
done

# Install dependencies
composer install --optimize-autoloader --no-interaction

# Generate key
php artisan key:generate

# Run migrations and seeders
php artisan migrate --force
php artisan db:seed --force

# Start PHP-FPM
php-fpm