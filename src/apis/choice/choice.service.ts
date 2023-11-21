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

  async update(id: string, updateChoiceInput: UpdateChoiceInput) {
    const question = await this.questionService.findOneById(id);

    if (!question) throw new NotFoundException('문항이 존재하지 않습니다.');

    const isExistChoice = await this.findOneChoiceById(
      updateChoiceInput.choice_id,
    );

    if (!isExistChoice) {
      throw new NotFoundException('선택지가 존재하지 않습니다.'); // 함수 즉시 종료
    }

    const newChoice = {
      ...isExistChoice,
      ...updateChoiceInput,
    };

    const result = await this.choiceRepository.save({
      ...newChoice,
      question: question,
    });

    return result;
    //* 하위 코드 -> 한번에 업데이트 할 시 중간에 선택지가 삭제될 경우에 대한 트랜젝션
    // const queryRunner =
    //   this.choiceRepository.manager.connection.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // try {
    //   const result = [];

    //   for (const choice of updateChoiceInput) {
    //     const isExist = await queryRunner.manager.findOne(Choice, {
    //       where: { choice_id: choice.choice_id },
    //     });

    //     if (!isExist) {
    //       await queryRunner.rollbackTransaction();
    //       throw new NotFoundException('선택지가 존재하지 않습니다.'); // 함수 즉시 종료
    //     }

    //     const newChoice = {
    //       ...isExist,
    //       ...choice,
    //     };

    //     const SaveChoice = await queryRunner.manager.save(Choice, newChoice);

    //     result.push(SaveChoice);
    //   }

    //   await queryRunner.commitTransaction();

    //   return result;
    // } catch (error) {
    //   throw error;
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async findAllByQuesiontId(id: string) {
    const question = await this.questionService.findOneById(id);

    if (!question) throw new NotFoundException('문항이 존재하지 않습니다.');

    const result = await this.choiceRepository.find({
      where: { question: { question_id: id } },
      order: { choice_no: 'ASC' },
    });

    return result;
  }

  async findOneChoiceById(id: string) {
    const question = await this.questionService.findOneById(id);

    if (!question) throw new NotFoundException('문항이 존재하지 않습니다.');

    return await this.choiceRepository.findOne({
      where: { choice_id: id },
    });
  }

  async remove(id: string) {
    const result = await this.choiceRepository.softDelete(id);

    return result.affected ? true : false;
  }
}
