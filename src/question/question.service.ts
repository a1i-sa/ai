import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import OpenAI from 'openai';
const baseURL = 'https://api.aimlapi.com';
const apiKey = '07788a14aee94410aef15bc34a583b40';
const systemPrompt = 'You are a travel agent. Be descriptive and helpful';
const api = new OpenAI({
  apiKey,
  baseURL,
});
@Injectable()
export class QuestionService {
  constructor(private httpService: HttpService) {}
  async getAnswer(question: { userPrompt: string }) {
    try {
      const completion = await api.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: question.userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 256,
      });

      const response = completion.choices[0].message.content;
      return response;
    } catch (error) {
      console.error('Error fetching answer:', error.message || error);
      return 'failed to get answer from ai-api , you should send your request like this format: {"userPrompt":"your question"}';
      throw new Error(
        'failed to get answer from ai-api , you should send your request like this format: {"userPrompt":"your question"}',
      );
    }
  }
}
