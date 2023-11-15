import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
@ObjectType()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  user_id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  // @OneToMany((type) => Su)
}
