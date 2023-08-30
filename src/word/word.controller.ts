import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  // 添加单词
  @Post('addWord')
  create(@Body() createWordDto: CreateWordDto) {
    console.log(createWordDto);
    
    return this.wordService.create(createWordDto);
  }

  // 获取用户所有的单词
  @Post('getWordsList')
  getAll(@Body() body: any) {
    return this.wordService.getAll(body);
  }

  // 获取单词的总个数
  @Post('getWordsCount')
  getWordsCount(@Body() body: any) {
    return this.wordService.getWordsCount(body.belonging);
  }

  // 获取复习单词
  @Post('getReviewWords')
  getReviewWords(@Body() body: any) {
    return this.wordService.getReviewWords(body);
  }

  // 批量删除单词
  @Post('deleteWords')
  deleteWords(@Body() body: any) {
    return this.wordService.deleteWords(body);
  }

  // 删除单词
  @Delete('deleteWord/:id')
  deleteWord(@Param('id') id: string) {
    return this.wordService.deleteWord(id);
  }

  // 更新单词
  @Put('updateWord/:id')
  update(@Param('id') id: string, @Body() body) {
    return this.wordService.updateWord(id, body);
  }
}
