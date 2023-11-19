import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyService } from '../survey/survey.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly surveyService: SurveyService,
  ) {}

  async create(id: string, createQuestionInput: CreateQuestionInput[]) {
    const survey = await this.surveyService.findOneById(id);
    if (!survey) throw new BadRequestException('설문지가 존재하지 않습니다.');

    const result = createQuestionInput.map((question) =>
      this.questionRepository.save({
        ...question,
        survey: survey,
      }),
    );

    return result;
  }

  async update(updateQuestionInput: UpdateQuestionInput[]) {
    const result = updateQuestionInput.map((question) =>
      this.questionRepository.save({
        question_id: question.question_id,
        ...question,
      }),
    );

    return result;
  }

  async findAllBySurveyId(id: string) {
    const result = await this.questionRepository.find({
      where: { survey: { survey_id: id } },
    });

    return result;
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async findOneById(id: string) {
    return await this.questionRepository.findOne({
      where: { question_id: id },
    });
  }

  async remove(id: string) {
    const result = await this.questionRepository.softDelete({
      question_id: id,
    });
    console.log(result);

    return result.affected ? true : false;
  }
}
