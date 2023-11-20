import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { CreateAllSurveyInput } from './dto/createAll-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyInput: CreateSurveyInput) {
    const isExist = await this.findOneSurveybyTitle(createSurveyInput.title);

    if (isExist)
      throw new BadRequestException('이미 존재하는 설문지 제목입니다.');

    return await this.surveyRepository.save(createSurveyInput);
  }

  async createAll(createAllSurveyInput: CreateAllSurveyInput) {
    const isExist = await this.findOneSurveybyTitle(createAllSurveyInput.title);

    if (isExist)
      throw new BadRequestException('이미 존재하는 설문지 제목입니다.');

    const result = await this.surveyRepository.save(createAllSurveyInput);
    console.log(result);

    return result;
  }

  async update(id: string, updateSurveyInput: UpdateSurveyInput) {
    const isExist = await this.surveyRepository.findOne({
      where: { survey_id: id },
    });

    if (!isExist) throw new BadRequestException('존재하지 않는 설문입니다.');

    const newSurvey = {
      ...isExist,
      ...updateSurveyInput,
    };

    return await this.surveyRepository.save(newSurvey);
  }

  async findAll() {
    return await this.surveyRepository.find({
      relations: ['question', 'question.choice'],
      order: { question: { item_no: 'ASC', choice: { choice_no: 'asc' } } },
    });
  }

  async findOneSurvey(survetId: string) {
    const result = await this.surveyRepository.findOne({
      where: { survey_id: survetId },
      relations: ['question', 'question.choice'],
      order: { question: { item_no: 'ASC', choice: { choice_no: 'asc' } } },
    });

    if (!result) throw new NotFoundException('설문이 존재하지 않습니다.');

    return result;
  }

  async findOneById(id: string) {
    return await this.surveyRepository.findOne({
      where: { survey_id: id },
    });
  }

  async remove(id: string) {
    const result = await this.surveyRepository.softDelete(id);

    console.log(result);

    return result.affected ? true : false;
  }

  async findOneSurveybyTitle(title: string) {
    return await this.surveyRepository.findOne({
      where: {
        title,
      },
    });
  }
}
