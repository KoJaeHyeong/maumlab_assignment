import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSurveyInput } from './dto/create-survey.input';
import { CreateAllSurveyInput } from './dto/createAll-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
import { SurveyService } from './survey.service';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Survey, { description: '설문지 작성' })
  async createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return await this.surveyService.create(createSurveyInput);
  }

  @Mutation(() => Survey, { description: '한번에 설문지 작성' })
  async createAllSurvey(
    @Args('createAllSurveyInput') createAllSurveyInput: CreateAllSurveyInput,
  ) {
    return await this.surveyService.createAll(createAllSurveyInput);
  }

  @Mutation(() => Survey, { description: '설문지 수정' })
  async updateSurvey(
    @Args('survey_id') id: string,
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    return this.surveyService.update(id, updateSurveyInput);
  }

  @Query(() => [Survey], { description: '모든 설문지 조회' })
  async fetchAllSurvey() {
    return this.surveyService.findAll();
  }

  @Query(() => Survey, { description: '특정 설문지 조회' })
  async fetchSurvey(@Args('survey_id') id: string) {
    return await this.surveyService.findOneSurvey(id);
  }

  @Mutation(() => Boolean, {
    description: '설문지 삭제',
  })
  async removeSurvey(@Args('survey_id') id: string) {
    return await this.surveyService.remove(id);
  }
}
