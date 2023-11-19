import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Question } from '../entities/question.entity';

@InputType()
export class CreateQuestionInput extends PickType(Question, [
  'item_no',
  'item',
] as const) {
  @Field(() => Int)
  item_no: number;

  @Field(() => String)
  item: string;
}
