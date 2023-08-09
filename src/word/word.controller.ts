import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  // 添加单词
  @Post('addWord')
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  // 获取用户所有的单词
  @Post('getWordsList')
  getAll(@Body() body: any) {
    return this.wordService.getAll(body.belonging);
  }

  // 获取单词的总个数
  @Post('getWordsCount')
  getWordsCount(@Body() body: any) {
    return this.wordService.getWordsCount(body.belonging);
  }

  // 获取复习单词的总个数
  @Post('getReviewWordsCount')
  getReviewWordsCount(@Body() body: any) {
    return this.wordService.getReviewWordsCount(body);
  }

  // 获取复习单词
  @Post('getReviewWords')
  getReviewWords(@Body() body: any) {
    return this.wordService.getReviewWords(body);
  }
}
