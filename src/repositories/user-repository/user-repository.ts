import { UpdateUserDto } from './../../users/dto/update-user.dto';
import { CreateUserDto } from './../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';

export interface UserRepository {
  findAll(where: any): Promise<Omit<User, 'password'>[]>;

  create(data: CreateUserDto): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findById(id: number): Promise<User>;

  delete(id: number): void;

  update(id: number, data: UpdateUserDto): Promise<User>;
}

export const UserRepository = 'UserRepository';
