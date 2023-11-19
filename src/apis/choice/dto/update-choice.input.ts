import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateChoiceInput } from './create-choice.input';

@InputType()
export class UpdateChoiceInput extends PartialType(CreateChoiceInput) {
  @Field(() => String)
  choice_id: string;

  @Field(() => Int, { nullable: true })
  choice_no?: number;

  @Field(() => String, { nullable: true })
  choice_item?: string;

  @Field(() => Int, { nullable: true })
  choice_score?: number;
}
