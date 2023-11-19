import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.input';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => String)
  question_id: string;

  @Field(() => Int)
  item_no: number;

  @Field(() => String)
  item: string;
}
