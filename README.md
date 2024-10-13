# Marketplace-projectFile

backend pet

## Getting Started

To run the project:

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

    ```bach
    cp .env.example .env
    ```

    Fill in the required values in `.env`.

4. **Run Migrations:**

    ```bach
    npx knex migrate:latest
    ```

    Rollback Last Migration:
     ```bach
    npx knex migrate:rollback
    ```

    Rollback All Migrations:
     ```bach
    npx knex migrate:rollback --all
    ```  

5. **Run Seeds:**

    ```bach
    npx knex seed:run
    ```
