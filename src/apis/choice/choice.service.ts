import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionService } from '../question/question.service';
import { CreateChoiceInput } from './dto/create-choice.input';
import { UpdateChoiceInput } from './dto/update-choice.input';
import { Choice } from './entities/choice.entity';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
    private readonly questionService: QuestionService,
  ) {}
  async create(id: string, createChoiceInput: CreateChoiceInput[]) {
    const question = await this.questionService.findOneById(id);

    if (!question) throw new NotFoundException('문항이 존재하지 않습니다.');

    const result = createChoiceInput.map((choice) =>
      this.choiceRepository.save({
        ...choice,
        question: question,
      }),
    );

    return result;
  }

  async update(updateChoiceInput: UpdateChoiceInput[]) {
    // const question:
  }

  findAll() {
    return `This action returns all choice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} choice`;
  }

  remove(id: number) {
    return `This action removes a #${id} choice`;
  }
}
