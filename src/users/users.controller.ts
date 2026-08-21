import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new ForbiddenException('You can only access your own user profile');
    }

    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new ForbiddenException('You can only update your own user profile');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new ForbiddenException('You can only delete your own user profile');
    }

    return this.usersService.remove(id);
  }
}
