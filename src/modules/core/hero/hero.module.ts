import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { MentorService } from 'src/modules/core/mentor/mentor.service';
import { Mentor } from 'src/modules/core/mentor/entities/mentor.entity';
import { LogsQuizQuestionsService } from 'src/logs/logs-quiz-questions/logs-quiz-questions.service';
import { LogsQuizQuestions } from 'src/logs/logs-quiz-questions/entities/logs-quiz-question.entity';
import { LogsTransactionService } from 'src/logs/logs-transaction/logs-transaction.service';
import { LogsTransaction } from 'src/logs/logs-transaction/entities/logs-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero, Mentor, LogsQuizQuestions, LogsTransaction])],
  controllers: [HeroController],
  providers: [
    HeroService,
    MentorService,
    LogsQuizQuestionsService,
    LogsTransactionService
  ],
  exports: [LogsQuizQuestionsService]
})
export class HeroModule {}
