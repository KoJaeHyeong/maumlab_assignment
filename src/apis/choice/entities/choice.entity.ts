import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Answer } from 'src/apis/answer/entities/answer.entity';
import { Question } from 'src/apis/question/entities/question.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'choice' })
@ObjectType()
export class Choice extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  choice_id: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  @Field(() => String)
  choice_item: string;

  @IsNotEmpty()
  @IsInt()
  @Column({ type: 'int' })
  @Field(() => Int)
  choice_no: number;

  @IsNotEmpty()
  @IsInt()
  @Column({ type: 'int' })
  @Field(() => Int)
  choice_score: number;

  @OneToMany(() => Answer, (answer) => answer.choice)
  @Field(() => [Answer])
  answer: Answer[];

  @ManyToOne(() => Question, (question) => question.choice)
  @JoinColumn({ name: 'question_id' })
  @Field(() => Question)
  question: Question;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
