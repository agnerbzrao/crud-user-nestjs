import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABSE_HOST,
      port: process.env.DATABSE_DOCKER_PORT as any,
      username: process.env.DATABSE_USER,
      password: process.env.DATABSE_PASSWORD,
      database: process.env.DATABSE_DATABASE,
      entities: [User],
      synchronize: true, // Set to false in production
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
