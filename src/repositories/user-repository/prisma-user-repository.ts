import { PrismaService } from './../prisma';
import { User } from '../../users/entities/user.entity';
import { UserRepository } from './user-repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async delete(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      data: data,
      where: { id },
    });
  }
  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async create(data: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash('1234', 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });

    return user;
  }

  async findAll(params: any): Promise<Omit<User, 'password'>[]> {
    const query: any = {};

    if (params?.email) {
      query.email = params.email;
    }
    const users = await this.prisma.user.findMany({
      where: params,
    });
    return users.map((user) => exclude(user, 'password'));
  }
}
