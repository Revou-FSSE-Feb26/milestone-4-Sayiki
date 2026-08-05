import { AccountType } from '@prisma/client';
export declare class CreateAccountDto {
    userId: number;
    name: string;
    type: AccountType;
    balance?: number;
}
