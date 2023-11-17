import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
@ObjectType()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  user_id: string;

  @IsEmail()
  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  // @OneToMany(() => Survey, (survey) => survey.user)
  // @Field(() => [Survey])
  // survey: Survey[];
}
