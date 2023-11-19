import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';
import { CreateChoiceInput } from './dto/create-choice.input';
import { UpdateChoiceInput } from './dto/update-choice.input';
import { Choice } from './entities/choice.entity';

@Resolver()
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Mutation(() => [Choice], { description: '선택지 등록' })
  async createChoice(
    @Args('question_id', { type: () => String }) id: string,
    @Args('createChoiceInput', { type: () => [CreateChoiceInput] })
    createChoiceInput: CreateChoiceInput[],
  ) {
    return await this.choiceService.create(id, createChoiceInput);
  }

  @Mutation(() => [Choice], { description: '선택지 수정' })
  async updateChoice(
    @Args('question_id') id: string,
    @Args('updateChoiceInput', { type: () => [UpdateChoiceInput] })
    updateChoiceInput: UpdateChoiceInput[],
  ) {
    return this.choiceService.update(id, updateChoiceInput);
  }

  @Query(() => [Choice], { description: '모든 선택지 조회' })
  async fetchAllChoiceOfQuestion(
    @Args('question_id', { type: () => String }) id: string,
  ) {
    return this.choiceService.findAllByQuesiontId(id);
  }

  @Query(() => Choice, { description: '선택지 조회' })
  async fetchOneChoice(@Args('choice_id', { type: () => String }) id: string) {
    return this.choiceService.findOneChoice(id);
  }

  @Mutation(() => Boolean)
  removeChoice(@Args('choice_id', { type: () => String }) id: string) {
    return this.choiceService.remove(id);
  }
}
