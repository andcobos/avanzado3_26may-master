import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req: Request) {
    if (!req.user || typeof req.user['userId'] === 'undefined') {
      throw new ForbiddenException('No autorizado.');
    }

    if (parseInt(id) !== Number(req.user['userId'])) {
      throw new ForbiddenException('No puedes eliminar otros usuarios.');
    }

    return this.usersService.deleteUser(id);
  }

}
