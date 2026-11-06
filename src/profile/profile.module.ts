import { Module } from '@nestjs/common';
import { ProfileLoaders } from './profile.loaders';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService, ProfileResolver, ProfileLoaders],
  exports: [ProfileLoaders],
})
export class ProfileModule {}
