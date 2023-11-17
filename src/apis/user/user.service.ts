import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const { email, password, ...rest } = createUserInput;
    const user = await this.findOneUser(email);

    if (user) throw new BadRequestException('이미 존재하는 유저입니다.');

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await this.userRepository.save({
      ...createUserInput,
      password: hashPassword,
    });

    return result;
  }

  async findOneUser(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
