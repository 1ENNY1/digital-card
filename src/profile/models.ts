import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() description: string;
  @Field(() => String, { nullable: true }) github?: string | null;
  @Field(() => String, { nullable: true }) linkedin?: string | null;
  @Field(() => String, { nullable: true }) website?: string | null;
}

@ObjectType('Skill')
export class SkillModel {
  @Field(() => ID) id: number;
  @Field() name: string;
}

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => ID) id: number;
  @Field() company: string;
  @Field() position: string;
  @Field() startDate: Date;
  @Field(() => Date, { nullable: true }) endDate?: Date | null;
  @Field(() => [String]) achievements: string[];
}

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() url: string;
  @Field(() => String, { nullable: true }) description?: string | null;
}
