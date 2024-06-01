import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

// Import config files
import { throttlerConfig, databaseConfig } from '@app/config'

// Import module own files
import { AppController } from './app.controller'
import { AppService } from './app.service'

// Entity files (temporal)
import { Task } from '@app/tasks/entities/task.entity'

// Features imports
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [throttlerConfig, databaseConfig],
    }),
    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('databaseConfig.host'),
        port: config.getOrThrow<number>('databaseConfig.port'),
        username: config.getOrThrow<string>('databaseConfig.username'),
        password: config.getOrThrow<string>('databaseConfig.password'),
        database: config.getOrThrow<string>('databaseConfig.database'),
        entities: [Task],
        //entities: [__dirname + 'src/**/*.model{.ts, js}'],
        synchronize: config.get('NODE_ENV') === 'production' ? false : true,
      }),
    }),
    // Throttler module (rate limit)
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow<number>('throttlerConfig.ttl'),
          limit: config.getOrThrow<number>('throttlerConfig.limit'),
        },
      ],
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
