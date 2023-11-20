import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Answer } from 'src/apis/answer/entities/answer.entity';
import { CompletedSurvey } from 'src/apis/completed-survey/entities/completed-survey.entity';
import { Question } from 'src/apis/question/entities/question.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'survey' })
@ObjectType()
export class Survey extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  survey_id: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  title: string;

  @IsString()
  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  survey_description?: string;

  // @ManyToOne(() => User, (user) => user.survey)
  // @JoinColumn({ name: 'user_id' })
  // @Field(() => User)
  // user: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  @Field(() => [Question], { defaultValue: [] })
  question: Question[];

  @OneToMany(() => Answer, (answer) => answer.survey)
  @Field(() => [Answer])
  answer: Answer[];

  @OneToMany(() => CompletedSurvey, (completedSurvey) => completedSurvey.survey)
  @Field(() => [CompletedSurvey])
  completedSurvey: CompletedSurvey[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
