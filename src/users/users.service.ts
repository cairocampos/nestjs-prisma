import { UserRepository } from './../repositories/user-repository/user-repository';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('Usuário já existe.');
    }
    return this.userRepository.create(createUserDto);
  }

  findAll(params: any) {
    return this.userRepository.findAll(params);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
