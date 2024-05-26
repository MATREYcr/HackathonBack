import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { QuizQuestionsService } from './quiz-questions.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';

@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionsService) {}

  @Post()
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionsService.create(createQuizQuestionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizQuestionsService.findOne(+id);
  }
}
