import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Answer } from 'src/apis/answer/entities/answer.entity';
import { CompletedSurvey } from 'src/apis/completed-survey/entities/completed-survey.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'participant' })
@ObjectType()
export class Participant extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  participant_id: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  @Field(() => String)
  participant_name: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  @Field(() => String)
  participant_birth: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  @Field(() => String)
  participant_sex: string;

  @OneToMany(() => Answer, (answer) => answer.participant)
  @Field(() => [Answer])
  answer: Answer[];

  @OneToMany(
    () => CompletedSurvey,
    (completedSurvey) => completedSurvey.participant,
  )
  @Field(() => [CompletedSurvey])
  completedSurvey: CompletedSurvey[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
