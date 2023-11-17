import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSurveyInput } from './dto/create-survey.input';
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

  // @Mutation(() => Survey)
  // updateSurvey(
  //   @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  // ) {
  //   return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
  // }

  @Query(() => [Survey], { name: 'survey' })
  findAll() {
    return this.surveyService.findAll();
  }

  @Query(() => Survey, { name: 'survey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.findOne(id);
  }

  @Mutation(() => Survey)
  removeSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.remove(id);
  }
}
