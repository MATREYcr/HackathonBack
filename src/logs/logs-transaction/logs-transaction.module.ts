import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsTransactionService } from './logs-transaction.service';
import { LogsTransactionController } from './logs-transaction.controller';
import { LogsTransaction } from './entities/logs-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogsTransaction])],
  controllers: [LogsTransactionController],
  providers: [LogsTransactionService],
})
export class LogsTransactionModule {}
