import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: number): Promise<{
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
    }>;
    create(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }>;
}
