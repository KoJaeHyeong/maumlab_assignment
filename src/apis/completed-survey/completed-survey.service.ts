import { Injectable } from '@nestjs/common';
import { CreateCompletedSurveyInput } from './dto/create-completed-survey.input';
import { UpdateCompletedSurveyInput } from './dto/update-completed-survey.input';

@Injectable()
export class CompletedSurveyService {
  create(createCompletedSurveyInput: CreateCompletedSurveyInput) {
    return 'This action adds a new completedSurvey';
  }

  findAll() {
    return `This action returns all completedSurvey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completedSurvey`;
  }

  update(id: number, updateCompletedSurveyInput: UpdateCompletedSurveyInput) {
    return `This action updates a #${id} completedSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} completedSurvey`;
  }
}
