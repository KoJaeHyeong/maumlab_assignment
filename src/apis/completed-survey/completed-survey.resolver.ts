import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompletedSurveyService } from './completed-survey.service';
import { CompletedSurveyWithScore } from './dto/completed-survey.return';
import { CompletedSurvey } from './entities/completed-survey.entity';

@Resolver(() => CompletedSurvey)
export class CompletedSurveyResolver {
  constructor(
    private readonly completedSurveyService: CompletedSurveyService,
  ) {}

  @Query(() => [CompletedSurveyWithScore], {
    description: '답변이 달린 모든 설문에 대한 설문자 및 답변 조회',
  })
  async fetchCompletedAllSurveyWithAnswer(@Args('survey_id') surveyId: string) {
    return this.completedSurveyService.findAll(surveyId);
  }

  @Query(() => CompletedSurveyWithScore, {
    description: '특정 설문에 대해 설문자 및 답변 조회',
  })
  async fetchCompletedSurveyWithAnswer(
    @Args('survey_id') surveyId: string,
    @Args('participant_id') participantId: string,
  ) {
    return await this.completedSurveyService.findOneSurveyWithAnswer(
      surveyId,
      participantId,
    );
  }

  @Mutation(() => Boolean, { description: '완료된 설문지 삭제' })
  async removeCompletedSurvey(
    @Args('survey_id') surveyId: string,
    @Args('participant_id') participantId: string,
  ) {
    return await this.completedSurveyService.remove(surveyId, participantId);
  }
}
