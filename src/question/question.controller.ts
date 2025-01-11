import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  async askQuestion(@Body() question: { userPrompt: string }) {
    return await this.questionService.getAnswer(question);
  }
}
