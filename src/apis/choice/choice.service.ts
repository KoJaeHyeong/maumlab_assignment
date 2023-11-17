import { Injectable } from '@nestjs/common';
import { CreateChoiceInput } from './dto/create-choice.input';
import { UpdateChoiceInput } from './dto/update-choice.input';

@Injectable()
export class ChoiceService {
  create(createChoiceInput: CreateChoiceInput) {
    return 'This action adds a new choice';
  }

  findAll() {
    return `This action returns all choice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} choice`;
  }

  update(id: number, updateChoiceInput: UpdateChoiceInput) {
    return `This action updates a #${id} choice`;
  }

  remove(id: number) {
    return `This action removes a #${id} choice`;
  }
}
