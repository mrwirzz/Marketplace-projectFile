## Getting Started

To run and use the project:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mrwirzz/Marketplace-projectFile.git
    cd Marketplace-projectFile
    ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Copy .env file:**

    ```bash
    cp .env.example .env
    ```

    Fill in the required values in `.env`.

4. **Run Migrations:**
    The knex library is used for migrations

    Run all migrations
    ```bash
    npx knex migrate:latest
    ```

    Rollback last migration:
     ```bash
    npx knex migrate:rollback
    ```

    Rollback all migrations:
     ```bash
    npx knex migrate:rollback --all
    ```  

5. **Run Seeds:**
    The knex library is used to fill the database with data

    ```bash
    npx knex seed:run
    ```

6. **Run tests:**

    The jest library is used for tests
    ```bababashshch
    npx test
    ```

    To find out your test coverage
    ```bash
    npx run coverage
    ```

## Contract

### Categories

#### Create
*POST /api/v1/categories/*

Request
```json
{
    "name": string
}
```

#### Get all
*GET /api/v1/categories/*

Request
```json
{}
```

#### Get by ID
*GET /api/v1/categories/:id*

Request
```json
{}
```

#### Update
*PUT /api/v1/categories/:id*

Request
```json
{
    "name": string
}
```

#### Delete
*DELETE /api/v1/categories/:id*

Request
```json
{}
```

### Orders

#### Create
*POST /api/v1/orders/*

Request
```json
{
  "userId": int,
  "products": [
    {
      "productId": int,
      "quantity": int
    }
  ]
}
```

#### Get all
*GET /api/v1/orders/*

Request
```json
{}
```

#### Get by ID
*GET /api/v1/orders/:id*

Request
```json
{}
```

#### Update
*PUT /api/v1/orders/:id*

Request
```json
{
  "products": [
    {
      "productId": int,
      "quantity": int
    }
  ]
}
```

#### Delete
*DELETE /api/v1/orders/:id*

Request
```json
{}
```

