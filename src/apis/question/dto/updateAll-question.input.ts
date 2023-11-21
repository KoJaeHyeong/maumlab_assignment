import { Field, InputType, Int } from '@nestjs/graphql';
import { UpdateAllChoiceInput } from 'src/apis/choice/dto/updateAll-choice.input';

@InputType()
export class UpdateAllQuestionInput {
  @Field(() => String)
  question_id: string;

  @Field(() => Int, { nullable: true })
  item_no?: number;

  @Field(() => String, { nullable: true })
  item?: string;

  @Field(() => [UpdateAllChoiceInput], { nullable: true })
  choice?: UpdateAllChoiceInput[];
}
