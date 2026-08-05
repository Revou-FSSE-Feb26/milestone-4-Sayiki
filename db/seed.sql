INSERT INTO users (name, email, password, role) VALUES
('Alex Johnson', 'alex@example.com', 'hashed_pass_1', 'user'),
('Sarah Connor', 'sarah@example.com', 'hashed_pass_2', 'user'),
('Michael Scott', 'michael@example.com', 'hashed_pass_3', 'admin');

INSERT INTO accounts (user_id, name, type, balance) VALUES
(1, 'Main Checking', 'bank', 2500.50),
(1, 'Wallet Cash', 'cash', 150.00),
(2, 'Savings Account', 'bank', 10500.00),
(2, 'GPay Wallet', 'e-wallet', 320.75),
(3, 'Corporate Card', 'bank', 50.00),
(3, 'Petty Cash', 'cash', 200.00);

INSERT INTO categories (name, type) VALUES
('Salary', 'income'),
('Freelance', 'income'),
('Groceries', 'expense'),
('Utilities', 'expense'),
('Entertainment', 'expense'),
('Investments', 'income'),
('Unused Category', 'expense');

INSERT INTO transactions (account_id, category_id, type, amount, description, transaction_date) VALUES
(1, 1, 'income', 3000.00, 'Monthly Paycheck', '2026-06-01'),
(1, 3, 'expense', 150.25, 'Supermarket trip', '2026-06-03'),
(1, 4, 'expense', 85.00, 'Electric bill', '2026-06-05'),
(1, 5, 'expense', 45.00, 'Cinema tickets', '2026-06-10'),
(2, 3, 'expense', 20.00, 'Snacks from local kiosk', '2026-06-02'),
(2, 5, 'expense', 15.00, 'Street artist tip', '2026-06-12'),
(3, 1, 'income', 5000.00, 'Bi-weekly payout', '2026-06-01'),
(3, 6, 'income', 250.00, 'Stock dividend', '2026-06-15'),
(3, 4, 'expense', 120.00, 'Internet service', '2026-06-18'),
(4, 2, 'income', 400.00, 'Design contract work', '2026-06-04'),
(4, 5, 'expense', 30.00, 'Streaming subscriptions', '2026-06-08'),
(4, 3, 'expense', 49.25, 'Mid-week groceries', '2026-06-19'),
(5, 3, 'expense', 200.00, 'Office snacks', '2026-06-05'),
(6, 4, 'expense', 50.00, 'Water supply refill', '2026-06-02'),
(1, 3, 'expense', 110.00, 'Weekly organic market', '2026-07-01'),
(1, 4, 'expense', 90.00, 'Power bill July', '2026-07-03'),
(2, 3, 'expense', 35.00, 'Bakery items', '2026-07-04'),
(3, 1, 'income', 5000.00, 'Bi-weekly payout July', '2026-07-01'),
(4, 5, 'expense', 12.99, 'Music streaming', '2026-07-02'),
(4, 3, 'expense', 88.50, 'Monthly supply run', '2026-07-05');