import { IsInt, IsString } from 'class-validator';

export class CreateLogsTransactionDto {
  @IsInt()
  crowns: number;

  @IsString()
  message: string;

  @IsInt()
  heroId: number;
  
}