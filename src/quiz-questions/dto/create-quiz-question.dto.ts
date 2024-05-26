import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsString()
  @MaxLength(255)
  signature: string;

  @IsInt()
  difficulty: number;

  @IsString()
  questionText: string;
}
