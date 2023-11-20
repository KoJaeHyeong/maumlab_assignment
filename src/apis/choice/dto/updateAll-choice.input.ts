import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAllChoiceInput {
  @Field(() => String)
  choice_id: string;

  @Field(() => Int, { nullable: true })
  choice_no?: number;

  @Field(() => String, { nullable: true })
  choice_item?: string;

  @Field(() => Int, { nullable: true })
  choice_score?: number;
}
