import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @Type(() => Number)
  @IsInt()
  accountId: number;

  @Type(() => Number)
  @IsInt()
  categoryId: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  transactionDate: string;
}
