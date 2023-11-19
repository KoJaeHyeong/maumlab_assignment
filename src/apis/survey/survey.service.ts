import { BadRequestException, Injectable } from '@nestjs/common';
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
    console.log('isExist', isExist);

    return await this.surveyRepository.save(createSurveyInput);
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
    return await this.surveyRepository.find({ relations: ['question'] });
  }

  async findOne(id: string) {
    return await this.surveyRepository.findOne({
      where: { survey_id: id },
      relations: ['question'],
    });
  }

  async remove(id: string) {
    const result = await this.surveyRepository.softDelete(id);

    console.log(result);

    return true;
  }

  async findOneSurveybyTitle(title: string) {
    return await this.surveyRepository.findOne({
      where: {
        title,
      },
    });
  }
}
