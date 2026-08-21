import { AuthService } from './auth.service';
declare class RegisterDto {
    name: string;
    email: string;
    password: string;
}
declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            createdAt: Date;
        };
    }>;
    login(body: LoginDto): Promise<{
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
export {};
