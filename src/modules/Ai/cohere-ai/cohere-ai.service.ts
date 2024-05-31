import { Injectable } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';
import { EXAMPLE_QUIZ } from './constants/constant';

@Injectable()
export class CohereAiService {
  private cohere: CohereClient;

  constructor() {
    this.cohere = new CohereClient({
      token: process.env.TOKEN_COHERE_AI,
    });
  }

  async generateQuestion(subject: string): Promise<string> {
    try {
      const question = this.formatQuestion(subject);
      const response = await this.cohere.generate({
        prompt: question,
        maxTokens: 2500,
      });

      if (response.generations && response.generations.length > 0) {
        let questionText = response.generations[0].text.trim();
        questionText = questionText.replace(/json/g, '');
        questionText = questionText.replace(/`/g, '');
        // const jsonData = JSON.parse(questionText);
        // console.log(jsonData, 'jsonDatajsonDatajsonDatajsonData')
        return questionText;
      } else {
        throw new Error('No se encontraron generaciones en la respuesta.');
      }
    } catch (error) {
      throw new Error('Error generando la pregunta: ' + error.message);
    }
  }

  formatQuestion(subject: string) {
    try {
      const exampleQuiz = JSON.stringify(EXAMPLE_QUIZ);
      const question = `En el idioma español genera 5 preguntas de la materia ${subject} especiales para niños con problemas de aprendizaje usando la estructura del siguiente formato (No incluyas las preguntas del formato ejemplo), en la respuesta solo devuelve el json, Formato: ${exampleQuiz}`;
      return question;
    } catch (error) {
      throw new Error('Error generando la pregunta: ' + error.message);
    }
  }
}
