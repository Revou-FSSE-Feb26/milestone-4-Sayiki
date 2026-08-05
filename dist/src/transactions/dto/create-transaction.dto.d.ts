import { TransactionType } from '@prisma/client';
export declare class CreateTransactionDto {
    accountId: number;
    categoryId: number;
    type: TransactionType;
    amount: number;
    description?: string;
    transactionDate: string;
}
