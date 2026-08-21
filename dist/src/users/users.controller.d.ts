import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(req: any, id: number): Promise<Omit<{
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
    update(req: any, id: number, updateUserDto: UpdateUserDto): Promise<Omit<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null>;
    remove(req: any, id: number): Promise<Omit<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
    }, "password"> | null>;
}
