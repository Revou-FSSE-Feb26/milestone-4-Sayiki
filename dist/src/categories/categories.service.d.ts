import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
    }[]>;
    findOne(id: number): Promise<{
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
        type: import(".prisma/client").$Enums.CategoryType;
    }>;
    create(createCategoryDto: CreateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
    }>;
}
