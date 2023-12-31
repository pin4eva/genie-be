import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from 'datasource';
import { config } from 'src/utils/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...databaseOptions,
          synchronize: config.NODE_ENV === 'development',
          logging: config.NODE_ENV === 'development' ? ['error'] : ['error'],
          dropSchema: true,
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
