// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MentorModule } from './mentor/mentor.module';
import { HeroModule } from './hero/hero.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OpenaiModule } from './openai/openai.module';
import { CohereAiModule } from './cohere-ai/cohere-ai.module';
import { QuizQuestionsModule } from './quiz-questions/quiz-questions.module';
import { LogsTransactionModule } from './logs/logs-transaction/logs-transaction.module';
import { LogsQuizQuestionsModule } from './logs/logs-quiz-questions/logs-quiz-questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule, 
    OpenaiModule, 
    CohereAiModule, 
    QuizQuestionsModule,
    MentorModule,
    HeroModule,
    LogsTransactionModule,
    LogsQuizQuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
