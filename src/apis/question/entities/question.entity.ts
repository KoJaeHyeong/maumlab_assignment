import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Survey } from 'src/apis/survey/entities/survey.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'question' })
@ObjectType()
export class Question extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  question_id: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  @Field(() => String)
  item: string;

  @IsNotEmpty()
  @IsInt()
  @Column({ type: 'int' })
  @Field(() => Int)
  item_no: number;

  @ManyToOne(() => Survey, (survey) => survey.question)
  @JoinColumn({ name: 'survey_id' })
  @Field(() => Survey)
  survey: Survey;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
