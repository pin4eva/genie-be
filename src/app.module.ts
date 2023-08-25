import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from 'datasource';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { config } from 'src/utils/config';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    // TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...databaseOptions,
          synchronize: config.NODE_ENV === 'development',
          logging: config.NODE_ENV === 'development' ? ['error'] : ['error'],
          // dropSchema: true,
        };
      },
    }),
    // Graphql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      path: `${config.API_PATH}/graphql`,

      playground: config.NODE_ENV === 'development',
      introspection: config.NODE_ENV === 'development',
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
        numberScalarMode: 'integer',
      },
      csrfPrevention: true,
      cache: new InMemoryLRUCache(), // for server side caching
    }),
    UserModule,
    AssetModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
