import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private sanitizeUser;
    findAll(): Promise<(Omit<{
        accounts: {
            id: number;
            name: string;
            createdAt: Date;
            userId: number;
            type: import(".prisma/client").$Enums.AccountType;
            balance: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null)[]>;
    findOne(id: number): Promise<Omit<{
        accounts: {
            id: number;
            name: string;
            createdAt: Date;
            userId: number;
            type: import(".prisma/client").$Enums.AccountType;
            balance: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null>;
    create(createUserDto: CreateUserDto): Promise<Omit<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null>;
    remove(id: number): Promise<Omit<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null>;
}
