import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Choice } from '../entities/choice.entity';

@InputType()
export class CreateAllChoiceInput extends PickType(Choice, [
  'choice_no',
  'choice_item',
  'choice_score',
] as const) {
  @Field(() => Int)
  choice_no: number;

  @Field(() => String)
  choice_item: string;

  @Field(() => Int)
  choice_score: number;
}
