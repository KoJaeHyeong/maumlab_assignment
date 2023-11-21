import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletedSurveyService } from '../completed-survey/completed-survey.service';
import { CompletedSurvey } from '../completed-survey/entities/completed-survey.entity';
import { Participant } from '../participant/entities/participant.entity';
import { ParticipantService } from '../participant/participant.service';
import { Survey } from '../survey/entities/survey.entity';
import { SurveyService } from '../survey/survey.service';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, Participant, Survey, CompletedSurvey]),
  ],
  providers: [
    AnswerResolver,
    AnswerService,
    SurveyService,
    ParticipantService,
    CompletedSurveyService,
  ],
})
export class AnswerModule {}
