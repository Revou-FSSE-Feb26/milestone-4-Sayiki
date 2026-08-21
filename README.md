# FinTrack API

FinTrack is a personal finance backend for tracking users, accounts, transactions, categories, and balances. The data model is built around four tables: users own accounts, accounts store transactions, and transactions are tagged with categories so income and spending can be tracked clearly.

## ERD

![Entity Relationship Diagram](docs/erd.png)

## Setup

```bash
npm install
```

Create a `.env` file and set `DATABASE_URL` and `JWT_SECRET`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fintrack"
JWT_SECRET="your-super-secret-key"
```

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

## Auth

This API now supports JWT-based authentication.

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "secret123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "secret123"
  }'
```

Use the returned `access_token` in the Authorization header:

```bash
curl http://localhost:3000/users/1 \
  -H "Authorization: Bearer <access_token>"
```

## Project Notes

The app exposes `users`, `accounts`, `categories`, and `transactions` modules. The accounts module also includes `GET /accounts/:id/transactions` for nested transaction data.

Live URL: https://milestone-4-sayiki.onrender.com
Swagger: https://milestone-4-sayiki.onrender.com/docs
