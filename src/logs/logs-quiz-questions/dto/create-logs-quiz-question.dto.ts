import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateLogsQuizQuestionsDto {
  @IsString()
  signature: string;

  @IsInt()
  correctAnswer: number;

  @IsInt()
  wrongAnswer: number;

  @IsInt()
  crowns: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsInt()
  heroId: number;
}
