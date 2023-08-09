import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
  ) {}

  // 添加单词
  create(createWordDto: CreateWordDto) {
    return this.wordRepository.save(createWordDto);
  }

  // 获取用户所有的单词
  async getAll(belonging: string) {
    const wordsList = await this.wordRepository.find({ where: { belonging } });
    return {
      code: 200,
      message: '获取成功',
      data: wordsList,
    };
  }

  // 获取单词的总个数
  async getWordsCount(belonging: string) {
    const wordsCount = await this.wordRepository.countBy({
      belonging,
    });
    return {
      code: 200,
      message: '获取成功',
      data: wordsCount,
    };
  }

  // 获取复习单词的总个数
  async getReviewWordsCount(body: any) {
    const { belonging, type } = body;
    let reviewWordsCount = 0;
    // 如果没有选择单词类型或者选择了两个单词类型，则获取所有类型的单词
    if (type.length === 0 || type.length === 2) {
      reviewWordsCount = await this.wordRepository.countBy({
        belonging,
      });
    } else {
      // 根据选择的单词类型获取单词
      reviewWordsCount = await this.wordRepository.countBy({
        belonging,
        mark: parseInt(type[0]),
      });
    }
    return {
      code: 200,
      message: '获取成功',
      data: reviewWordsCount,
    };
  }

  // 获取复习单词
  async getReviewWords(body: any) {
    const { belonging, type, count, order } = body;
    let reviewWords = [];
    // 顺序获取单词
    if (type.length === 0 || type.length === 2) {
      // 如果没有选择单词类型或者选择了两个单词类型，则获取所有类型的单词
      reviewWords = await this.wordRepository.find({
        where: { belonging },
        take: parseInt(count),
      });
    } else {
      // 根据选择的单词类型获取单词
      reviewWords = await this.wordRepository.find({
        where: { belonging, mark: parseInt(type[0]) },
        take: parseInt(count),
      });
    }

    if (order === 'random') {
      // 随机获取单词
      reviewWords.sort(() => Math.random() - 0.5);
    }

    return {
      code: 200,
      message: '获取成功',
      data: reviewWords,
    };
  }
}
