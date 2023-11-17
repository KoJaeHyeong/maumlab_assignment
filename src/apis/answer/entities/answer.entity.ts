import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { Choice } from 'src/apis/choice/entities/choice.entity';
import { Participant } from 'src/apis/participant/entities/participant.entity';
import { Question } from 'src/apis/question/entities/question.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'answer' })
@ObjectType()
export class Answer extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  answer_id: string;

  @ManyToOne(() => Choice, (choice) => choice.answer)
  @JoinColumn({ name: 'choice_id' })
  @Field(() => Choice)
  choice: Choice;

  @ManyToOne(() => Question, (question) => question.answer)
  @JoinColumn({ name: 'question_id' })
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Participant, (participant) => participant.answer)
  @JoinColumn({ name: 'participant_id' })
  @Field(() => Participant)
  participant: Participant;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
