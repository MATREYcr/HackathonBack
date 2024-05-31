import { Controller, Post, Body } from '@nestjs/common';
import { CohereAiService } from './cohere-ai.service';

@Controller('cohere-ai')
export class CohereAiController {
  constructor(private readonly cohereAiService: CohereAiService) {}

  @Post('generate-question')
  async generateQuestion(@Body('subject') subject: string) {
    const question = await this.cohereAiService.generateQuestion(subject);
    return { question };
  }
}
