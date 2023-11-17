import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
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

  // @IsBoolean()
  // @Column({ type: 'boolean', default: false })
  // @Field(() => Boolean)
  // is_completed: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  // @ManyToOne(() => User, (user) => user.survey)
  // @JoinColumn({ name: 'user_id' })
  // @Field(() => User)
  // user: User;

  @OneToMany(() => Question, (question) => question.survey)
  @Field(() => [Question])
  question: Question[];
}
