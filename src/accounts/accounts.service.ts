import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.account.findMany({
      include: { user: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: { user: true, transactions: true },
    });

    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }

    return account;
  }

  async findTransactions(id: number) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: {
        transactions: {
          include: { category: true },
          orderBy: { transactionDate: 'desc' },
        },
      },
    });

    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }

    return account;
  }

  create(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({ data: createAccountDto });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.account.delete({ where: { id } });
  }
}
