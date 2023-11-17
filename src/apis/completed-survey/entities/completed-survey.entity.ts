import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'completed_survey' })
@ObjectType()
export class CompletedSurvey extends CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  completed_survey_id: string;
}
