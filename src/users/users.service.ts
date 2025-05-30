import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.usersRepository.findOne({ where: { id: parseInt(id) } });
        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

        await this.usersRepository.remove(user);
        return { message: `Usuario con id ${id} eliminado correctamente.` };
    }
}
