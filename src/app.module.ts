import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MentorModule } from './mentor/mentor.module';
import { HeroModule } from './hero/hero.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OpenaiModule } from './openai/openai.module';
import { CohereAiModule } from './cohere-ai/cohere-ai.module';
import { QuizQuestionsModule } from './quiz-questions/quiz-questions.module';

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
      synchronize: true //para q se active la creacion de las tablas 
    }), MentorModule, HeroModule, AuthModule, OpenaiModule, CohereAiModule, QuizQuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
