import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsQuizQuestionsDto } from './create-logs-quiz-question.dto';

export class UpdateLogsQuizQuestionDto extends PartialType(CreateLogsQuizQuestionsDto) {}
