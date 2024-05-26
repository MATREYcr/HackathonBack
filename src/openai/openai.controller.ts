import { Controller, Post, Body, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) { }

  @Post('generate') // Aquí definimos la ruta POST /openai/generate
  async generate(@Body('prompt') prompt: string): Promise<string> {
    return this.openaiService.generateResponse(prompt.trim());
  }

  @Get()
  findAll() {
    return "hola mundoooo"
  }
}
