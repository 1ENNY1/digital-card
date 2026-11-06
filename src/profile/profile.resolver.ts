import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExperienceModel, ProfileModel, ProjectModel, SkillModel } from './models';
import { ProfileService } from './profile.service';
import { GqlContext } from './gql-context';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, { nullable: true })
  profile() {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [SkillModel])
  skills(@Parent() profile: ProfileModel, @Context() ctx: GqlContext) {
    return ctx.loaders.skills.load(profile.id);
  }

  @ResolveField(() => [ExperienceModel])
  experience(@Parent() profile: ProfileModel, @Context() ctx: GqlContext) {
    return ctx.loaders.experiences.load(profile.id);
  }

  @ResolveField(() => [ProjectModel])
  projects(@Parent() profile: ProfileModel, @Context() ctx: GqlContext) {
    return ctx.loaders.projects.load(profile.id);
  }
}
