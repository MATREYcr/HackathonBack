import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { LogsQuizQuestions } from './entities/logs-quiz-question.entity';
import { CreateLogsQuizQuestionsDto } from './dto/create-logs-quiz-question.dto';

@Injectable()
export class LogsQuizQuestionsService {
  constructor(
    @InjectRepository(LogsQuizQuestions)
    private logsQuizQuestionsRepository: Repository<LogsQuizQuestions>,
  ) { }

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
      throw error;
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.logsQuizQuestionsRepository.clear();
    } catch (error) {
      throw new HttpException('Error deleting all logs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getQuestionsStatisticsByHeroId(heroId: number) {
    const logs = await this.logsQuizQuestionsRepository.find({ where: { heroId } });

    const correctAnswers = logs.reduce((sum, log) => sum + log.correctAnswer, 0);
    const wrongAnswers = logs.reduce((sum, log) => sum + log.wrongAnswer, 0);

    const quizLogsByDay = await this.getQuizLogsByDay(heroId);
    const correctAnswersBySubject = await this.getCorrectAnswersBySubject(heroId);
    const incorrectAnswersBySubject = await this.getIncorrectAnswersBySubject(heroId);

    const res = {
      totalQuestionnaires: logs.length,
      correctAnswers,
      wrongAnswers,
      quizLogsByDay,
      correctAnswersBySubject,
      incorrectAnswersBySubject
    }
    return res;
  }


  async getQuizLogsByDay(heroId: number): Promise<{ labels: string[], datasets: { label: string, data: number[], backgroundColor: string }[] }> {
    const startDate = this.getStartOfWeek();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const logs = await this.logsQuizQuestionsRepository.find({
      where: {
        heroId,
        createdAt: Between(startDate, endDate)
      }
    });

    const data = this.calculateLogsPerDay(logs);

    return {
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      datasets: [
        {
          label: "Cuestionarios completados",
          data,
          backgroundColor: "#ff3b19"
        }
      ]
    };
  }

  private getStartOfWeek(): Date {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const numDaysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - numDaysFromMonday);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  private calculateLogsPerDay(logs: LogsQuizQuestions[]): number[] {
    const counts = Array(5).fill(0);

    logs.forEach(log => {
      const day = log.createdAt.getDay();
      if (day >= 1 && day <= 5) {
        counts[day - 1]++;
      }
    });

    return counts;
  }

  async getCorrectAnswersBySubject(heroId: number): Promise<{ labels: string[], datasets: { label: string, data: number[], borderColor: string, fill: boolean }[] }> {
    const subjects = ["Matemáticas", "Ciencias", "Lenguaje", "Arte"];
    const data = await Promise.all(subjects.map(async (subject) => {
      const logs = await this.logsQuizQuestionsRepository.find({ where: { heroId, signature: subject } });
      return logs.reduce((sum, log) => sum + log.correctAnswer, 0);
    }));

    return {
      labels: subjects,
      datasets: [
        {
          label: "Respuestas Correctas por materia",
          data,
          borderColor: "#ff3b19",
          fill: false
        }
      ]
    };
  }

  async getIncorrectAnswersBySubject(heroId: number): Promise<{ labels: string[], datasets: { data: number[], backgroundColor: string[] }[] }> {
    const subjects = ["Matemáticas", "Ciencias", "Lenguaje", "Arte"];
    const backgroundColor = ["#ff3b19", "#36A2EB", "#FFCE56", "#4BC0C0"];

    const data = await Promise.all(subjects.map(async (subject) => {
      const logs = await this.logsQuizQuestionsRepository.find({ where: { heroId, signature: subject } });
      return logs.reduce((sum, log) => sum + log.wrongAnswer, 0);
    }));

    return {
      labels: subjects,
      datasets: [
        {
          data,
          backgroundColor,
        }
      ]
    };
  }


}
