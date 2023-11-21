import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

@Resolver()
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => [Question], { description: '문항 작성' })
  async createQuestion(
    @Args('survey_id') id: string,
    @Args('createQuestionInput', { type: () => [CreateQuestionInput] })
    createQuestionInput: CreateQuestionInput[],
  ) {
    return await this.questionService.create(id, createQuestionInput);
  }

  @Mutation(() => Question, { description: '문항 수정' })
  async updateQuestion(
    @Args('survey_id') id: string,
    @Args('updateQuestionInput', { type: () => UpdateQuestionInput })
    updateQuestionInput: UpdateQuestionInput,
  ) {
    return await this.questionService.update(id, updateQuestionInput);
  }

  @Query(() => [Question], { description: '설문에 대한 모든 문항 조회' })
  async fetchAllQuestion(
    @Args('survey_id', { type: () => String }) id: string,
  ) {
    return await this.questionService.findAllBySurveyId(id);
  }

  @Query(() => Question, { description: '문항 조회' })
  async fetchQuestion(@Args('question_id', { type: () => String }) id: string) {
    return await this.questionService.findOneById(id);
  }

  @Mutation(() => Boolean, { description: '문항 삭제' })
  async removeQuestion(
    @Args('question_id', { type: () => String }) id: string,
  ) {
    return await this.questionService.remove(id);
  }
}
