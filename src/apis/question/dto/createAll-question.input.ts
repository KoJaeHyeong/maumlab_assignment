import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { CreateAllChoiceInput } from 'src/apis/choice/dto/createAll-choice.input';
import { Question } from '../entities/question.entity';

@InputType()
export class CreateAllQuestionInput extends PickType(Question, [
  'item_no',
  'item',
] as const) {
  @Field(() => Int)
  item_no: number;

  @Field(() => String)
  item: string;

  @Field(() => [CreateAllChoiceInput], { nullable: true })
  choice?: CreateAllChoiceInput[];
}
