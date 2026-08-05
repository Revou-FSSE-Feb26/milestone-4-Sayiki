import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.AccountType;
        balance: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findTransactions(id: number): Promise<{
        transactions: ({
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
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.AccountType;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
    findOne(id: number): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
        };
        transactions: {
            id: number;
            createdAt: Date;
            type: import(".prisma/client").$Enums.TransactionType;
            transactionDate: Date;
            accountId: number;
            categoryId: number;
            amount: import("@prisma/client/runtime/library").Decimal;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.AccountType;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
    create(createAccountDto: CreateAccountDto): import(".prisma/client").Prisma.Prisma__AccountClient<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.AccountType;
        balance: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateAccountDto: UpdateAccountDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.AccountType;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        type: import(".prisma/client").$Enums.AccountType;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
}
