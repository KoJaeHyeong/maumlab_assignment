import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Answer } from 'src/apis/answer/entities/answer.entity';
import { Choice } from 'src/apis/choice/entities/choice.entity';
import { Survey } from 'src/apis/survey/entities/survey.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  @IsInt()
  @Column({ type: 'int' })
  @Field(() => Int)
  item_no: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  @Field(() => String)
  item: string;

  @OneToMany(() => Choice, (choice) => choice.question)
  @Field(() => [Choice])
  choice: Choice[];

  @OneToMany(() => Answer, (answer) => answer.question)
  @Field(() => [Answer])
  answer: Answer[];

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
