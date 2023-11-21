import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
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

  async update(id: string, updateSurveyInput: UpdateSurveyInput) {
    const isExist = await this.findOneById(id);

    if (!isExist) throw new NotFoundException('존재하지 않는 설문입니다.');

    const newSurvey = {
      ...isExist,
      ...updateSurveyInput,
    };

    const result = await this.surveyRepository.save(newSurvey);
    console.log(result);

    result.title = '메롱';

    return result;
  }

  async findAll(page: number, take: number) {
    if (page <= 0) throw new BadRequestException('페이지를 불러올수 없습니다.');

    const [survey, total] = await this.surveyRepository.findAndCount({
      take: take,
      skip: (page - 1) * take,
      relations: ['question', 'question.choice'],

      order: {
        created_at: 'ASC',
        question: { item_no: 'ASC', choice: { choice_no: 'ASC' } },
      },
    });

    return { survey, total };
  }

  async findOneSurvey(survetId: string) {
    const result = await this.surveyRepository.findOne({
      where: { survey_id: survetId },
      relations: ['question', 'question.choice'],
      order: { question: { item_no: 'ASC', choice: { choice_no: 'ASC' } } },
    });

    if (!result) throw new NotFoundException('설문이 존재하지 않습니다.');

    return result;
  }

  async remove(id: string) {
    const result = await this.surveyRepository.softDelete(id);

    return result.affected ? true : false;
  }

  /* ******************************* */
  /*           재사용 공통 함수          */
  /* ******************************* */

  async findOneById(id: string) {
    return await this.surveyRepository.findOne({
      where: { survey_id: id },
    });
  }

  async findOneSurveybyTitle(title: string) {
    return await this.surveyRepository.findOne({
      where: {
        title,
      },
    });
  }
}
