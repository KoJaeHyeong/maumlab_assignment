import { CreateChoiceInput } from './create-choice.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChoiceInput extends PartialType(CreateChoiceInput) {
  @Field(() => Int)
  id: number;
}
