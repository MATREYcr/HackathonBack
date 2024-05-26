import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor() {
    // this.openai = new OpenAI({ apiKey: '' });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.openai.completions.create({
      model: 'gpt-3.5-turbo', // Puedes cambiar el modelo según tus necesidades
      prompt: prompt,
      max_tokens: 100,
    });

    return response.choices[0].text.trim();
  }
}
