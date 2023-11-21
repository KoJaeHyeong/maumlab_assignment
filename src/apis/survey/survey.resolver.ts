import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSurveyInput } from './dto/create-survey.input';
import { SurveyPagination } from './dto/pagination-survey';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
import { SurveyService } from './survey.service';

@Resolver('Survey')
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Survey, { description: '설문지 작성' })
  async createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ): Promise<Survey> {
    return await this.surveyService.create(createSurveyInput);
  }

  @Mutation(() => Survey, { description: '설문지 수정' })
  async updateSurvey(
    @Args('survey_id') id: string,
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    return this.surveyService.update(id, updateSurveyInput);
  }

  @Query(() => SurveyPagination, { description: '페이징된 설문지 조회' })
  async fetchAllSurvey(
    @Args('page', { type: () => Int }) page: number,
    @Args('take', { type: () => Int }) take: number,
  ): Promise<SurveyPagination> {
    return await this.surveyService.findAll(page, take);
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
