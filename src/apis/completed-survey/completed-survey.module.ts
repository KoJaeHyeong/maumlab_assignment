import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletedSurveyResolver } from './completed-survey.resolver';
import { CompletedSurveyService } from './completed-survey.service';
import { CompletedSurvey } from './entities/completed-survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompletedSurvey])],
  providers: [CompletedSurveyResolver, CompletedSurveyService],
})
export class CompletedSurveyModule {}
