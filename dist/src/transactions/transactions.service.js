"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTransactionDto) {
        const { accountId, categoryId, amount, type, description, transactionDate, } = createTransactionDto;
        return this.prisma.$transaction(async (tx) => {
            const account = await tx.account.findUnique({ where: { id: accountId } });
            if (!account)
                throw new common_1.NotFoundException(`Account ${accountId} not found`);
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
            const adjustment = type === client_1.TransactionType.income ? amount : -amount;
            await tx.account.update({
                where: { id: accountId },
                data: { balance: { increment: adjustment } },
            });
            return transaction;
        });
    }
    async findAll() {
        return this.prisma.transaction.findMany({
            include: { category: true, account: true },
        });
    }
    async findOne(id) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: { category: true, account: true },
        });
        if (!transaction)
            throw new common_1.NotFoundException(`Transaction ${id} not found`);
        return transaction;
    }
    async update(id, updateTransactionDto) {
        return this.prisma.$transaction(async (tx) => {
            const existing = await tx.transaction.findUnique({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException(`Transaction ${id} not found`);
            const revert = existing.type === client_1.TransactionType.income
                ? -Number(existing.amount)
                : Number(existing.amount);
            await tx.account.update({
                where: { id: existing.accountId },
                data: { balance: { increment: revert } },
            });
            const nextAccountId = updateTransactionDto.accountId ?? existing.accountId;
            const nextCategoryId = updateTransactionDto.categoryId ?? existing.categoryId;
            const nextType = updateTransactionDto.type ?? existing.type;
            const nextAmount = updateTransactionDto.amount ?? Number(existing.amount);
            const nextDescription = updateTransactionDto.description ?? existing.description;
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
            const newAdjustment = nextType === client_1.TransactionType.income
                ? Number(nextAmount)
                : -Number(nextAmount);
            await tx.account.update({
                where: { id: nextAccountId },
                data: { balance: { increment: newAdjustment } },
            });
            return updated;
        });
    }
    async remove(id) {
        return this.prisma.$transaction(async (tx) => {
            const existing = await tx.transaction.findUnique({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException(`Transaction ${id} not found`);
            const revert = existing.type === client_1.TransactionType.income
                ? -Number(existing.amount)
                : Number(existing.amount);
            await tx.account.update({
                where: { id: existing.accountId },
                data: { balance: { increment: revert } },
            });
            return tx.transaction.delete({ where: { id } });
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map