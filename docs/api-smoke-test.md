# FinTrack API Smoke Test Documentation

This file shows one request/response example for each resource that exists in the repo right now.

## Users

```bash
curl -X GET http://localhost:3000/users
```

```json
[
  {
    "id": 1,
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "password": "hashed_pass_1",
    "role": "user",
    "accounts": []
  }
]
```

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }'
```

```json
{
  "id": 4,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePassword123!",
  "role": "user"
}
```

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "email": "not-an-email",
    "password": "short"
  }'
```

```json
{
  "statusCode": 400,
  "message": [
    "name must be longer than or equal to 2 characters",
    "email must be an email",
    "password must be longer than or equal to 8 characters"
  ],
  "error": "Bad Request"
}
```

## Accounts

```bash
curl -X GET http://localhost:3000/accounts
```

```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Main Checking",
    "type": "bank",
    "balance": "2500.50",
    "user": {
      "id": 1,
      "name": "Alex Johnson",
      "email": "alex@example.com",
      "password": "hashed_pass_1",
      "role": "user"
    }
  }
]
```

```bash
curl -X GET http://localhost:3000/accounts/1/transactions
```

```json
{
  "id": 1,
  "name": "Main Checking",
  "transactions": [
    {
      "id": 1,
      "type": "income",
      "amount": "3000.00",
      "category": {
        "id": 1,
        "name": "Salary",
        "type": "income"
      }
    }
  ]
}
```

```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "name": "Wallet Cash",
    "type": "cash",
    "balance": 150
  }'
```

```json
{
  "id": 7,
  "userId": 1,
  "name": "Wallet Cash",
  "type": "cash",
  "balance": "150.00"
}
```

```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "abc",
    "name": "",
    "type": "invalid"
  }'
```

```json
{
  "statusCode": 400,
  "message": [
    "userId must be an integer number",
    "name should not be empty",
    "type must be one of the following values: cash, bank, e-wallet"
  ],
  "error": "Bad Request"
}
```

## Categories

```bash
curl -X GET http://localhost:3000/categories
```

```json
[
  {
    "id": 1,
    "name": "Salary",
    "type": "income"
  }
]
```

```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Groceries",
    "type": "expense"
  }'
```

```json
{
  "id": 8,
  "name": "Groceries",
  "type": "expense"
}
```

```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": 123,
    "type": "other"
  }'
```

```json
{
  "statusCode": 400,
  "message": [
    "name must be a string",
    "type must be one of the following values: income, expense"
  ],
  "error": "Bad Request"
}
```

## Transactions

```bash
curl -X GET http://localhost:3000/transactions
```

```json
[
  {
    "id": 1,
    "accountId": 1,
    "categoryId": 1,
    "type": "income",
    "amount": "3000.00",
    "description": "Monthly Paycheck",
    "transactionDate": "2026-06-01"
  }
]
```

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 1,
    "categoryId": 3,
    "type": "expense",
    "amount": 45.5,
    "description": "Weekly Grocery Trip",
    "transactionDate": "2026-08-05"
  }'
```

```json
{
  "id": 21,
  "accountId": 1,
  "categoryId": 3,
  "type": "expense",
  "amount": "45.50",
  "description": "Weekly Grocery Trip",
  "transactionDate": "2026-08-05"
}
```

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 1,
    "categoryId": 3,
    "type": "invalid_type",
    "amount": -20,
    "transactionDate": "not-a-date"
  }'
```

```json
{
  "statusCode": 400,
  "message": [
    "type must be one of the following values: income, expense, transfer",
    "amount must be a positive number",
    "transactionDate must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request"
}
```
