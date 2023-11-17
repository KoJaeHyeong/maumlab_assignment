import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompletedSurveyService } from './completed-survey.service';
import { CompletedSurvey } from './entities/completed-survey.entity';
import { CreateCompletedSurveyInput } from './dto/create-completed-survey.input';
import { UpdateCompletedSurveyInput } from './dto/update-completed-survey.input';

@Resolver(() => CompletedSurvey)
export class CompletedSurveyResolver {
  constructor(private readonly completedSurveyService: CompletedSurveyService) {}

  @Mutation(() => CompletedSurvey)
  createCompletedSurvey(@Args('createCompletedSurveyInput') createCompletedSurveyInput: CreateCompletedSurveyInput) {
    return this.completedSurveyService.create(createCompletedSurveyInput);
  }

  @Query(() => [CompletedSurvey], { name: 'completedSurvey' })
  findAll() {
    return this.completedSurveyService.findAll();
  }

  @Query(() => CompletedSurvey, { name: 'completedSurvey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.completedSurveyService.findOne(id);
  }

  @Mutation(() => CompletedSurvey)
  updateCompletedSurvey(@Args('updateCompletedSurveyInput') updateCompletedSurveyInput: UpdateCompletedSurveyInput) {
    return this.completedSurveyService.update(updateCompletedSurveyInput.id, updateCompletedSurveyInput);
  }

  @Mutation(() => CompletedSurvey)
  removeCompletedSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.completedSurveyService.remove(id);
  }
}
