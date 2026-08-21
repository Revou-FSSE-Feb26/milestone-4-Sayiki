import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private sanitizeUser<T extends { password?: string }>(user: T | null) {
    if (!user) return null;
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { accounts: true },
      orderBy: { id: 'asc' },
    });

    return users.map((user) => this.sanitizeUser(user));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return this.sanitizeUser(user);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return this.sanitizeUser(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const data = { ...updateUserDto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.sanitizeUser(user);
  }

  async remove(id: number) {
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return this.sanitizeUser(user);
  }
}
