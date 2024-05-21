import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MentorModule } from './mentor/mentor.module';
import { HeroModule } from './hero/hero.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567',
      database: 'hackathonback',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false //para q se active la creacion de las tablas 
    }), MentorModule, HeroModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
