import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'ormconfig';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customHttpExceptionFormatError } from './common/filter/gql-formatError';
import { apiModules } from './common/modules/apis.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'),
      formatError: customHttpExceptionFormatError,
      // includeStacktraceInErrorResponses: false,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormconfig,
    }),
    ...apiModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
