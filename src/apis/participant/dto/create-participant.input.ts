import { Field, InputType, PickType } from '@nestjs/graphql';
import { Participant } from '../entities/participant.entity';

@InputType()
export class CreateParticipantInput extends PickType(Participant, [
  'participant_name',
  'participant_birth',
  'participant_sex',
] as const) {
  @Field(() => String)
  participant_name: string;

  @Field(() => String, { description: 'yyyyMMdd 형식' })
  participant_birth: string;

  @Field(() => String, { description: '남자/여자' })
  participant_sex: string;
}
