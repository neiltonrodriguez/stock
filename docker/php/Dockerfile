FROM php:8.2-fpm

# Instalações
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    libonig-dev \
    libpq-dev \
    netcat-openbsd \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

# Copia o .env.docker da raiz do projeto (graças ao novo contexto)
COPY docker/.env.docker /var/www/.env

# Copia o projeto Laravel inteiro
COPY ./app /var/www

RUN composer install --optimize-autoloader --no-interaction
# Instala dependências Laravel
# RUN composer install --optimize-autoloader --no-interaction \
#     && php artisan key:generate \
#     && php artisan migrate --force \
#     && php artisan db:seed --force

# Copia o script de entrada
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exponha a porta e use o entrypoint
EXPOSE 9000
ENTRYPOINT ["entrypoint.sh"]
