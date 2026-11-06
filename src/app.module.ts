import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileLoaders } from './profile/profile.loaders';
import { GqlContext } from './profile/gql-context';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ProfileModule],
      inject: [ProfileLoaders],
      useFactory: (loaders: ProfileLoaders) => ({
        path: '/graphql',
        autoSchemaFile: true,
        sortSchema: true,
        introspection: true,
        playground: false,
        // Apollo Sandbox вместо старого playground
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: false })],
        context: (): GqlContext => ({ loaders: loaders.create() }),
      }),
    }),
  ],
})
export class AppModule {}
