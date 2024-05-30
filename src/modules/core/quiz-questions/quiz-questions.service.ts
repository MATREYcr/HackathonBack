// src/quiz-questions/quiz-questions.service.ts
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';

@Injectable()
export class QuizQuestionsService {
  constructor(
    @InjectRepository(QuizQuestion)
    private quizQuestionsRepository: Repository<QuizQuestion>,
  ) { }

  async create(createQuizQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion> {
    try {
      const quizQuestion = this.quizQuestionsRepository.create(createQuizQuestionDto);
      return await this.quizQuestionsRepository.save(quizQuestion);
    } catch (error) {
      throw new HttpException(
        'Error creating QuizQuestion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<QuizQuestion[]> {
    try {
      return await this.quizQuestionsRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error fetching QuizQuestions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<QuizQuestion> {
    try {
      const quizQuestion = await this.quizQuestionsRepository.findOneBy({ id });
      if (!quizQuestion) {
        throw new NotFoundException(`QuizQuestion with ID ${id} not found`);
      }
      return quizQuestion;
    } catch (error) {
      throw new HttpException(
        'Error fetching QuizQuestion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneBySignature(signature: string): Promise<QuizQuestion> {
    const questions = await this.quizQuestionsRepository.find({ where: { signature } });
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    return randomQuestion;
  }

  async update(id: number, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion> {
    try {
      await this.quizQuestionsRepository.update(id, updateQuizQuestionDto);
      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Error updating QuizQuestion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.quizQuestionsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`QuizQuestion with ID ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(
        'Error deleting QuizQuestion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
