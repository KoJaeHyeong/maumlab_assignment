import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';
import { CreateChoiceInput } from './dto/create-choice.input';
import { UpdateChoiceInput } from './dto/update-choice.input';
import { Choice } from './entities/choice.entity';

@Resolver()
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Mutation(() => [Choice])
  async createChoice(
    @Args('question_id', { type: () => String }) id: string,
    @Args('createChoiceInput', { type: () => [CreateChoiceInput] })
    createChoiceInput: CreateChoiceInput[],
  ) {
    return await this.choiceService.create(id, createChoiceInput);
  }

  @Mutation(() => [Choice])
  async updateChoice(
    @Args('updateChoiceInput', { type: () => [UpdateChoiceInput] })
    updateChoiceInput: UpdateChoiceInput[],
  ) {
    return this.choiceService.update(updateChoiceInput);
  }

  @Query(() => [Choice], { name: 'choice' })
  findAll() {
    return this.choiceService.findAll();
  }

  @Query(() => Choice, { name: 'choice' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.choiceService.findOne(id);
  }

  @Mutation(() => Choice)
  removeChoice(@Args('id', { type: () => Int }) id: number) {
    return this.choiceService.remove(id);
  }
}
