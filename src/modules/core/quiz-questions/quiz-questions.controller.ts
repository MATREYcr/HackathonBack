import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { QuizQuestionsService } from './quiz-questions.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';

@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionsService) { }

  @Post()
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionsService.create(createQuizQuestionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<QuizQuestion> {
    return this.quizQuestionsService.findOne(+id);
  }

  @Get('signature/:signature')
  async findOneBySignature(@Param('signature') signature: string): Promise<QuizQuestion> {
    return this.quizQuestionsService.findOneBySignature(signature);
  }
}
