import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';
import { Choice } from './entities/choice.entity';
import { CreateChoiceInput } from './dto/create-choice.input';
import { UpdateChoiceInput } from './dto/update-choice.input';

@Resolver(() => Choice)
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Mutation(() => Choice)
  createChoice(@Args('createChoiceInput') createChoiceInput: CreateChoiceInput) {
    return this.choiceService.create(createChoiceInput);
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
  updateChoice(@Args('updateChoiceInput') updateChoiceInput: UpdateChoiceInput) {
    return this.choiceService.update(updateChoiceInput.id, updateChoiceInput);
  }

  @Mutation(() => Choice)
  removeChoice(@Args('id', { type: () => Int }) id: number) {
    return this.choiceService.remove(id);
  }
}
