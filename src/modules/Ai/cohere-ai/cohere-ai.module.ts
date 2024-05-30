import { Module } from '@nestjs/common';
import { CohereAiService } from './cohere-ai.service';
import { CohereAiController } from './cohere-ai.controller';

@Module({
  controllers: [CohereAiController],
  providers: [CohereAiService],
})
export class CohereAiModule {}
