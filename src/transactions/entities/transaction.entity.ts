export class Transaction {
  id: number;
  accountId: number;
  categoryId: number;
  type: string;
  amount: number;
  description?: string;
  transactionDate: Date;
  createdAt: Date;
}
