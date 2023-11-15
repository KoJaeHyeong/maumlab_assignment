import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'ormconfig';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { apiModules } from './common/modules/apis.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'),
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
