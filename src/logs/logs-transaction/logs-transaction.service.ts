import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogsTransactionDto } from './dto/create-logs-transaction.dto';
import { LogsTransaction } from './entities/logs-transaction.entity';

@Injectable()
export class LogsTransactionService {
  constructor(
    @InjectRepository(LogsTransaction)
    private readonly logsTransactionRepository: Repository<LogsTransaction>,
  ) { }

  async create(createLogsTransactionDto: CreateLogsTransactionDto): Promise<LogsTransaction> {
    try {
      const logsTransaction = this.logsTransactionRepository.create(createLogsTransactionDto);
      return await this.logsTransactionRepository.save(logsTransaction);
    } catch (error) {
      throw new HttpException('Failed to create log transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<LogsTransaction[]> {
    try {
      return await this.logsTransactionRepository.find();
    } catch (error) {
      throw new HttpException('Failed to fetch log transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByHeroId(heroId: number): Promise<LogsTransaction[]> {
    try {
      return await this.logsTransactionRepository.find({ where: { heroId } });
    } catch (error) {
      throw new HttpException('Failed to fetch log transactions by heroId', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<LogsTransaction> {
    try {
      const logsTransaction = await this.logsTransactionRepository.findOne({
        where: { id }
      });
      if (!logsTransaction) {
        throw new NotFoundException(`LogsTransaction with ID ${id} not found`);
      }
      return logsTransaction;
    } catch (error) {
      throw new HttpException('Failed to fetch log transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.logsTransactionRepository.clear();
    } catch (error) {
      throw new HttpException('Failed to delete log transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
