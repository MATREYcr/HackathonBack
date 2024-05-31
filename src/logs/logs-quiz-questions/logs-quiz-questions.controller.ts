import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LogsQuizQuestionsService } from './logs-quiz-questions.service';
import { CreateLogsQuizQuestionsDto } from './dto/create-logs-quiz-question.dto';
import { LogsQuizQuestions } from './entities/logs-quiz-question.entity';

@Controller('logs-quiz-questions')
export class LogsQuizQuestionsController {
  constructor(private readonly logsQuizQuestionsService: LogsQuizQuestionsService) {}

  @Get('hero/:heroId')
  async findByHeroId(@Param('heroId', ParseIntPipe) heroId: number) {
    return this.logsQuizQuestionsService.findByHeroId(heroId);
  }

  @Get('Statistics/:heroId')
  async getQuestionsStatisticsByHeroId(@Param('heroId', ParseIntPipe) heroId: number) {
    return this.logsQuizQuestionsService.getQuestionsStatisticsByHeroId(heroId);
  }

  @Get('correct-answers-by-subject/:heroId')
  async getCorrectAnswersBySubject(@Param('heroId') heroId: number) {
    return this.logsQuizQuestionsService.getCorrectAnswersBySubject(heroId);
  }

  @Post()
  async create(@Body() createLogsQuizQuestionsDto: CreateLogsQuizQuestionsDto): Promise<LogsQuizQuestions> {
    return this.logsQuizQuestionsService.create(createLogsQuizQuestionsDto);
  }

}
