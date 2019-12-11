import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { JsonplaceholderModule } from './jsonplaceholder/jsonplaceholder.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    JsonplaceholderModule,
    ConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.envConfig.mysqlHost,
        port: configService.envConfig.mysqlPort,
        database: configService.envConfig.mysqlDatabase,
        username: configService.envConfig.mysqlUsername,
        password: configService.envConfig.mysqlPassword,
        synchronize: true,
        entities: [User],
      }),
    }),
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
