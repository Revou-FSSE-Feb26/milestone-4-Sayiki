# FinTrack API

FinTrack is my personal finance backend for tracking users, accounts, transactions, categories, and balances. The data model is built around four tables: users own accounts, accounts store transactions, and transactions are tagged with categories so income and spending can be tracked clearly.

## ERD

```mermaid
erDiagram
  USERS ||--o{ ACCOUNTS : owns
  ACCOUNTS ||--o{ TRANSACTIONS : records
  CATEGORIES ||--o{ TRANSACTIONS : tags

  USERS {
    int id
    string name
    string email
    string password
    string role
    datetime created_at
  }

  ACCOUNTS {
    int id
    int user_id
    string name
    string type
    decimal balance
    datetime created_at
  }

  CATEGORIES {
    int id
    string name
    string type
  }

  TRANSACTIONS {
    int id
    int account_id
    int category_id
    string type
    decimal amount
    string description
    date transaction_date
    datetime created_at
  }
```

The exported ERD image is saved at `docs/erd.png`.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env`, then set `DATABASE_URL` to your local or hosted PostgreSQL connection string.

## Database

Run the raw SQL files against PostgreSQL when you need the SQL schema, seed data, or query examples:

```bash
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql
psql "$DATABASE_URL" -f db/queries.sql
```

If you want to use Prisma, generate and seed the Prisma schema with:

```bash
npx prisma migrate dev
npm run db:seed
```

## Run Locally

```bash
npm run start:dev
```

## Project Notes

The app exposes `users`, `accounts`, `categories`, and `transactions` modules. The accounts module also includes `GET /accounts/:id/transactions` for nested transaction data.

Live URL: add the deployed base URL here after deployment.
