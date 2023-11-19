import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.input';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => String)
  question_id: string;

  @Field(() => Int, { nullable: true })
  item_no?: number;

  @Field(() => String, { nullable: true })
  item?: string;
}
