import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE (Auto update balance)
  async create(createTransactionDto: CreateTransactionDto) {
    const {
      accountId,
      categoryId,
      amount,
      type,
      description,
      transactionDate,
    } = createTransactionDto;

    return this.prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({ where: { id: accountId } });
      if (!account)
        throw new NotFoundException(`Account ${accountId} not found`);

      const transaction = await tx.transaction.create({
        data: {
          accountId,
          categoryId,
          type,
          amount,
          description,
          transactionDate: new Date(transactionDate),
        },
      });

      const adjustment = type === TransactionType.income ? amount : -amount;
      await tx.account.update({
        where: { id: accountId },
        data: { balance: { increment: adjustment } },
      });

      return transaction;
    });
  }

  // READ ALL
  async findAll() {
    return this.prisma.transaction.findMany({
      include: { category: true, account: true },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { category: true, account: true },
    });
    if (!transaction)
      throw new NotFoundException(`Transaction ${id} not found`);
    return transaction;
  }

  // UPDATE (Recalculate balance)
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.transaction.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Transaction ${id} not found`);

      const revert =
        existing.type === TransactionType.income
          ? -Number(existing.amount)
          : Number(existing.amount);
      await tx.account.update({
        where: { id: existing.accountId },
        data: { balance: { increment: revert } },
      });

      const nextAccountId =
        updateTransactionDto.accountId ?? existing.accountId;
      const nextCategoryId =
        updateTransactionDto.categoryId ?? existing.categoryId;
      const nextType = updateTransactionDto.type ?? existing.type;
      const nextAmount = updateTransactionDto.amount ?? Number(existing.amount);
      const nextDescription =
        updateTransactionDto.description ?? existing.description;
      const nextTransactionDate = updateTransactionDto.transactionDate
        ? new Date(updateTransactionDto.transactionDate)
        : existing.transactionDate;

      const updated = await tx.transaction.update({
        where: { id },
        data: {
          accountId: nextAccountId,
          categoryId: nextCategoryId,
          type: nextType,
          amount: nextAmount,
          description: nextDescription,
          transactionDate: nextTransactionDate,
        },
      });

      const newAdjustment =
        nextType === TransactionType.income
          ? Number(nextAmount)
          : -Number(nextAmount);
      await tx.account.update({
        where: { id: nextAccountId },
        data: { balance: { increment: newAdjustment } },
      });

      return updated;
    });
  }

  // DELETE (Revert balance)
  async remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.transaction.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Transaction ${id} not found`);

      const revert =
        existing.type === TransactionType.income
          ? -Number(existing.amount)
          : Number(existing.amount);
      await tx.account.update({
        where: { id: existing.accountId },
        data: { balance: { increment: revert } },
      });

      return tx.transaction.delete({ where: { id } });
    });
  }
}
