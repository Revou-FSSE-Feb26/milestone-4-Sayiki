import {
  PrismaClient,
  AccountType,
  CategoryType,
  TransactionType,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'hashed_pass_1',
        role: 'user',
      },
      {
        name: 'Sarah Connor',
        email: 'sarah@example.com',
        password: 'hashed_pass_2',
        role: 'user',
      },
      {
        name: 'Michael Scott',
        email: 'michael@example.com',
        password: 'hashed_pass_3',
        role: 'admin',
      },
    ],
  });

  const createdUsers = await prisma.user.findMany({ orderBy: { id: 'asc' } });

  await prisma.account.createMany({
    data: [
      {
        userId: createdUsers[0].id,
        name: 'Main Checking',
        type: AccountType.bank,
        balance: 2500.5,
      },
      {
        userId: createdUsers[0].id,
        name: 'Wallet Cash',
        type: AccountType.cash,
        balance: 150,
      },
      {
        userId: createdUsers[1].id,
        name: 'Savings Account',
        type: AccountType.bank,
        balance: 10500,
      },
      {
        userId: createdUsers[1].id,
        name: 'GPay Wallet',
        type: AccountType.e_wallet,
        balance: 320.75,
      },
      {
        userId: createdUsers[2].id,
        name: 'Corporate Card',
        type: AccountType.bank,
        balance: 50,
      },
      {
        userId: createdUsers[2].id,
        name: 'Petty Cash',
        type: AccountType.cash,
        balance: 200,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      { name: 'Salary', type: CategoryType.income },
      { name: 'Freelance', type: CategoryType.income },
      { name: 'Groceries', type: CategoryType.expense },
      { name: 'Utilities', type: CategoryType.expense },
      { name: 'Entertainment', type: CategoryType.expense },
      { name: 'Investments', type: CategoryType.income },
      { name: 'Unused Category', type: CategoryType.expense },
    ],
  });

  const accounts = await prisma.account.findMany({ orderBy: { id: 'asc' } });
  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });

  await prisma.transaction.createMany({
    data: [
      {
        accountId: accounts[0].id,
        categoryId: categories[0].id,
        type: TransactionType.income,
        amount: 3000,
        description: 'Monthly Paycheck',
        transactionDate: new Date('2026-06-01'),
      },
      {
        accountId: accounts[0].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 150.25,
        description: 'Supermarket trip',
        transactionDate: new Date('2026-06-03'),
      },
      {
        accountId: accounts[0].id,
        categoryId: categories[3].id,
        type: TransactionType.expense,
        amount: 85,
        description: 'Electric bill',
        transactionDate: new Date('2026-06-05'),
      },
      {
        accountId: accounts[0].id,
        categoryId: categories[4].id,
        type: TransactionType.expense,
        amount: 45,
        description: 'Cinema tickets',
        transactionDate: new Date('2026-06-10'),
      },
      {
        accountId: accounts[1].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 20,
        description: 'Snacks from local kiosk',
        transactionDate: new Date('2026-06-02'),
      },
      {
        accountId: accounts[1].id,
        categoryId: categories[4].id,
        type: TransactionType.expense,
        amount: 15,
        description: 'Street artist tip',
        transactionDate: new Date('2026-06-12'),
      },
      {
        accountId: accounts[2].id,
        categoryId: categories[0].id,
        type: TransactionType.income,
        amount: 5000,
        description: 'Bi-weekly payout',
        transactionDate: new Date('2026-06-01'),
      },
      {
        accountId: accounts[2].id,
        categoryId: categories[5].id,
        type: TransactionType.income,
        amount: 250,
        description: 'Stock dividend',
        transactionDate: new Date('2026-06-15'),
      },
      {
        accountId: accounts[2].id,
        categoryId: categories[3].id,
        type: TransactionType.expense,
        amount: 120,
        description: 'Internet service',
        transactionDate: new Date('2026-06-18'),
      },
      {
        accountId: accounts[3].id,
        categoryId: categories[1].id,
        type: TransactionType.income,
        amount: 400,
        description: 'Design contract work',
        transactionDate: new Date('2026-06-04'),
      },
      {
        accountId: accounts[3].id,
        categoryId: categories[4].id,
        type: TransactionType.expense,
        amount: 30,
        description: 'Streaming subscriptions',
        transactionDate: new Date('2026-06-08'),
      },
      {
        accountId: accounts[3].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 49.25,
        description: 'Mid-week groceries',
        transactionDate: new Date('2026-06-19'),
      },
      {
        accountId: accounts[4].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 200,
        description: 'Office snacks',
        transactionDate: new Date('2026-06-05'),
      },
      {
        accountId: accounts[5].id,
        categoryId: categories[3].id,
        type: TransactionType.expense,
        amount: 50,
        description: 'Water supply refill',
        transactionDate: new Date('2026-06-02'),
      },
      {
        accountId: accounts[0].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 110,
        description: 'Weekly organic market',
        transactionDate: new Date('2026-07-01'),
      },
      {
        accountId: accounts[0].id,
        categoryId: categories[3].id,
        type: TransactionType.expense,
        amount: 90,
        description: 'Power bill July',
        transactionDate: new Date('2026-07-03'),
      },
      {
        accountId: accounts[1].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 35,
        description: 'Bakery items',
        transactionDate: new Date('2026-07-04'),
      },
      {
        accountId: accounts[2].id,
        categoryId: categories[0].id,
        type: TransactionType.income,
        amount: 5000,
        description: 'Bi-weekly payout July',
        transactionDate: new Date('2026-07-01'),
      },
      {
        accountId: accounts[3].id,
        categoryId: categories[4].id,
        type: TransactionType.expense,
        amount: 12.99,
        description: 'Music streaming',
        transactionDate: new Date('2026-07-02'),
      },
      {
        accountId: accounts[3].id,
        categoryId: categories[2].id,
        type: TransactionType.expense,
        amount: 88.5,
        description: 'Monthly supply run',
        transactionDate: new Date('2026-07-05'),
      },
    ],
  });

  console.log(
    `Seeded ${createdUsers.length} users, 6 accounts, 7 categories, and 20 transactions.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
