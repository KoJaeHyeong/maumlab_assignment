import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  choice_id: string;

  @Field(() => String)
  question_id: string;

  // @Field(() => String)
  // participant_id: string;
}
