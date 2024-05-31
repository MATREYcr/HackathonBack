import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MentorService } from '../modules/core/mentor/mentor.service';
import { HeroService } from '../modules/core/hero/hero.service';
import { Mentor } from 'src/modules/core/mentor/entities/mentor.entity';
import { Hero } from 'src/modules/core/hero/entities/hero.entity';
import { LogsQuizQuestionsService } from 'src/logs/logs-quiz-questions/logs-quiz-questions.service';
import { LogsQuizQuestions } from 'src/logs/logs-quiz-questions/entities/logs-quiz-question.entity';
import { LogsTransactionService } from 'src/logs/logs-transaction/logs-transaction.service';
import { LogsTransaction } from '../logs/logs-transaction/entities/logs-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor, Hero, LogsQuizQuestions, LogsTransaction])],
  controllers: [AuthController],
  providers: [
    AuthService, MentorService, HeroService, LogsQuizQuestionsService, LogsTransactionService
  ],
})
export class AuthModule { }
