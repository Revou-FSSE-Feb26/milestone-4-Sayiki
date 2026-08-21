import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: Date;
    } | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            createdAt: Date;
        };
    }>;
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            createdAt: Date;
        };
    }>;
}
