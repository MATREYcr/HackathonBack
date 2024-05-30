import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsQuizQuestions } from './entities/logs-quiz-question.entity';
import { CreateLogsQuizQuestionsDto } from './dto/create-logs-quiz-question.dto';

@Injectable()
export class LogsQuizQuestionsService {
  constructor(
    @InjectRepository(LogsQuizQuestions)
    private logsQuizQuestionsRepository: Repository<LogsQuizQuestions>,
  ) {}

  async create(createLogsQuizQuestionsDto: CreateLogsQuizQuestionsDto): Promise<LogsQuizQuestions> {
    try {
      const log = this.logsQuizQuestionsRepository.create(createLogsQuizQuestionsDto);
      return await this.logsQuizQuestionsRepository.save(log);
    } catch (error) {
      throw new HttpException('Error creating log', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<LogsQuizQuestions[]> {
    try {
      return await this.logsQuizQuestionsRepository.find();
    } catch (error) {
      throw new HttpException('Error finding logs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHeroId(heroId: number): Promise<LogsQuizQuestions[]> {
    try {
      return await this.logsQuizQuestionsRepository.find({ where: { heroId } });
    } catch (error) {
      throw new HttpException('Error finding logs by heroId', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<LogsQuizQuestions> {
    try {
      const log = await this.logsQuizQuestionsRepository.findOne({ where: { id } });
      if (!log) {
        throw new NotFoundException(`Log with ID ${id} not found`);
      }
      return log;
    } catch (error) {
      throw new HttpException('Error finding log', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.logsQuizQuestionsRepository.clear();
    } catch (error) {
      throw new HttpException('Error deleting all logs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
