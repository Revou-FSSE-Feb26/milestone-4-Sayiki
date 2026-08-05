import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        transactionDate: Date;
        accountId: number;
        categoryId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
    }>;
    findAll(): Promise<({
        account: {
            id: number;
            name: string;
            createdAt: Date;
            userId: number;
            type: import(".prisma/client").$Enums.AccountType;
            balance: import("@prisma/client/runtime/library").Decimal;
        };
        category: {
            id: number;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
        };
    } & {
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        transactionDate: Date;
        accountId: number;
        categoryId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
    })[]>;
    findOne(id: number): Promise<{
        account: {
            id: number;
            name: string;
            createdAt: Date;
            userId: number;
            type: import(".prisma/client").$Enums.AccountType;
            balance: import("@prisma/client/runtime/library").Decimal;
        };
        category: {
            id: number;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
        };
    } & {
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        transactionDate: Date;
        accountId: number;
        categoryId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
    }>;
    update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<{
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        transactionDate: Date;
        accountId: number;
        categoryId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        transactionDate: Date;
        accountId: number;
        categoryId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
    }>;
}
