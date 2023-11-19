import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { QuestionService } from '../question/question.service';
import { Survey } from '../survey/entities/survey.entity';
import { SurveyService } from '../survey/survey.service';
import { ChoiceResolver } from './choice.resolver';
import { ChoiceService } from './choice.service';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Choice, Question, Survey])],
  providers: [ChoiceResolver, ChoiceService, QuestionService, SurveyService],
})
export class ChoiceModule {}
