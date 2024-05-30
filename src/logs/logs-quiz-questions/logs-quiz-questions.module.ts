import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsQuizQuestionsService } from './logs-quiz-questions.service';
import { LogsQuizQuestionsController } from './logs-quiz-questions.controller';
import { LogsQuizQuestions } from './entities/logs-quiz-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogsQuizQuestions])],
  providers: [LogsQuizQuestionsService],
  controllers: [LogsQuizQuestionsController],
})
export class LogsQuizQuestionsModule {}
