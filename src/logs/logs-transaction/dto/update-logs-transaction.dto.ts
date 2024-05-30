import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsTransactionDto } from './create-logs-transaction.dto';

export class UpdateLogsTransactionDto extends PartialType(CreateLogsTransactionDto) {}
