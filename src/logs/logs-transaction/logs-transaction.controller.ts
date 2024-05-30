import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LogsTransactionService } from './logs-transaction.service';
import { LogsTransaction } from './entities/logs-transaction.entity';

@Controller('logs-transaction')
export class LogsTransactionController {
  constructor(private readonly logsTransactionService: LogsTransactionService) {}

  @Get()
  findAll(): Promise<LogsTransaction[]> {
    return this.logsTransactionService.findAll();
  }

  @Get('hero/:heroId')
  findByHeroId(@Param('heroId', ParseIntPipe) heroId: number): Promise<LogsTransaction[]> {
    return this.logsTransactionService.findByHeroId(heroId);
  }
}
