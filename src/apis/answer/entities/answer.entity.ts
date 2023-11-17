import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'answer' })
@ObjectType()
export class Answer extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  answer_id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
