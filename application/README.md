# API de Gerenciamento de Produtos

API RESTful para gerenciamento de produtos com autenticação JWT e interface web integrada.

## Recursos

- **Autenticação JWT** segura
- **CRUD completo** de produtos
- **Filtros avançados** (nome, categoria, preço)
- **Paginação** de resultados
- **Web UI** integrada
- **Docker-ready**

## Rotas da API (v1)

### Autenticação
| Método | Endpoint       | Descrição               |
|--------|----------------|-------------------------|
| POST   | `/api/login`   | Obter token JWT         |

### Produtos (requer autenticação)
| Método | Endpoint                     | Descrição                          |
|--------|------------------------------|------------------------------------|
| GET    | `/api/v1/products`           | Listar produtos (com filtros)      |
| POST   | `/api/v1/products`           | Criar novo produto                 |
| GET    | `/api/v1/products/{id}`      | Visualizar um produto              |
| PUT    | `/api/v1/products/{id}`      | Atualizar um produto               |
| DELETE | `/api/v1/products/{id}`      | Excluir um produto                 |
| GET    | `/api/v1/products/categories`| Listar categorias disponíveis      |

### Gerenciamento de Sessão
| Método | Endpoint             | Descrição               |
|--------|----------------------|-------------------------|
| POST   | `/api/v1/logout`     | Invalidar token         |
| POST   | `/api/v1/refresh`    | Atualizar token         |
| GET    | `/api/v1/me`         | Informações do usuário  |

## Rotas Web

| Método | Endpoint             | Descrição                          |
|--------|----------------------|------------------------------------|
| GET    | `/products`          | Listagem de produtos (com filtros) |
| GET    | `/products/create`   | Formulário de criação              |
| POST   | `/products`          | Armazenar novo produto             |
| GET    | `/products/{id}/edit`| Formulário de edição               |
| PUT    | `/products/{id}`     | Atualizar produto                  |
| DELETE | `/products/{id}`     | Excluir produto                    |

## Autenticação

A API usa JWT (JSON Web Tokens). Para autenticar:

1. Faça login para obter o token:
   ```bash
   curl -X POST http://localhost:8000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password"}'
   ```

2. Use o token nas requisições:
   ```bash
   curl -H "Authorization: Bearer {seu_token}" http://localhost:8000/api/v1/products
   ```

## Rodando projeto com Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/neiltonrodriguez/stock

2. Construa a imagem e inicie o container:
   ```bash
   entre na pasta /docker e esecute o comando abaixo
   docker-compose up --build
   ```

3. aguarde o processo todo concluir e Acesse:
   - API: `http://localhost:8000/api`
   - Web: `http://localhost:8000/products`


## Instalação local manual

1. Clone o repositório:
   ```bash
   git clone https://github.com/neiltonrodriguez/stock
   cd stock, todos os demais comandos pra instalação manual, será na pasta ./application
   ```

2. Instale as dependências:
   ```bash
   execute os comandos abaixo:
   composer install
   npm install
   ```

3. Configure o ambiente (copie o `.env.example`):
   ```bash
   cp .env.example .env
   php artisan key:generate
   php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" --force
   php artisan jwt:secret --force
   ```

4. Execute as migrações:
   ```bash
   php artisan migrate --seed
   ```

5. Inicie o servidor:
   ```bash
   execute os comandos
   php artisan serve
   npm run dev
   ```

## Variáveis de Ambiente

Chaves obrigatórias no `.env`:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stock
DB_USERNAME=seu usuario mysql
DB_PASSWORD=sua senha do mysql local
```

## Testando com Curl

### Exemplo: Criar produto
```bash
curl -X POST http://localhost:8000/api/v1/products \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "Notebook",
    "description": "i7 16GB RAM",
    "price": 4500.00,
    "category": "eletronicos"
  }'
```

### Exemplo: Listar produtos filtrados
```bash
curl -X GET "http://localhost:8000/api/v1/products?category=eletronicos&min_price=1000" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

