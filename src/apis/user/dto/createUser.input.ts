import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'name',
] as const) {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;
}
