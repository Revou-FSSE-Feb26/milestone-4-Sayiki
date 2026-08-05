-- 1. Filtered SELECT: All expense transactions for Account ID 1 ordered by date descending
SELECT * FROM transactions 
WHERE account_id = 1 AND type = 'expense' 
ORDER BY transaction_date DESC;

-- 2. 3-Table JOIN: Detailed transaction details linking User, Account, Category
SELECT 
    u.name AS user_name, 
    a.name AS account_name, 
    c.name AS category_name, 
    t.amount, 
    t.type, 
    t.transaction_date 
FROM transactions t
JOIN accounts a ON t.account_id = a.id
JOIN users u ON a.user_id = u.id
JOIN categories c ON t.category_id = c.id;

-- 3. GROUP BY Aggregation: Total expense per category per month
SELECT 
    c.name AS category_name, 
    TO_CHAR(t.transaction_date, 'YYYY-MM') AS month, 
    SUM(t.amount) AS total_expense
FROM transactions t
JOIN categories c ON t.category_id = c.id
WHERE t.type = 'expense'
GROUP BY c.name, TO_CHAR(t.transaction_date, 'YYYY-MM')
ORDER BY month DESC, total_expense DESC;

-- 4. Advanced Query (CTE + Subquery): Accounts whose balance is below their owner's average balance
WITH UserAvgBalance AS (
    SELECT user_id, AVG(balance) AS avg_balance 
    FROM accounts 
    GROUP BY user_id
)
SELECT a.id, a.name, a.balance, uab.avg_balance
FROM accounts a
JOIN UserAvgBalance uab ON a.user_id = uab.user_id
WHERE a.balance < uab.avg_balance;

-- 5. LEFT JOIN: Categories with zero transactions recorded
SELECT c.id, c.name, c.type 
FROM categories c
LEFT JOIN transactions t ON c.id = t.category_id
WHERE t.id IS NULL;

-- 6. Filtered Aggregation: Total income generated per user
SELECT u.name, SUM(t.amount) AS total_income
FROM users u
JOIN accounts a ON u.id = a.user_id
JOIN transactions t ON a.id = t.account_id
WHERE t.type = 'income'
GROUP BY u.id, u.name;

-- 7. Advanced Window Function: Rank transactions by amount per account
SELECT 
    account_id, 
    amount, 
    transaction_date,
    DENSE_RANK() OVER (PARTITION BY account_id ORDER BY amount DESC) as amount_rank
FROM transactions;

-- 8. Subquery Filtering: Users who have at least one account with a balance over 1000
SELECT name, email FROM users 
WHERE id IN (
    SELECT DISTINCT user_id FROM accounts WHERE balance > 1000
);