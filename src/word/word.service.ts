import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';

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
  async getAll(body) {
    const { belonging, pagination } = body;
    let { current, pageSize } = pagination;
    current = parseInt(current);
    pageSize = parseInt(pageSize);
    const skip = (current - 1) * pageSize;

    const wordsList = await this.wordRepository.find({
      where: { belonging },
      skip,
      take: pageSize,
    });
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

  // 批量删除单词
  async deleteWords(body: any) {
    const { ids } = body;
    let deleteResult = null;
    if (ids.length > 0) deleteResult = await this.wordRepository.delete(ids);

    if (deleteResult.affected > 0)
      return {
        code: 200,
        message: '删除成功',
        data: deleteResult,
      };
    else
      return {
        code: 400,
        message: '删除失败',
      };
  }

  // 删除单词
  async deleteWord(id: string) {
    const deleteResult = await this.wordRepository.delete(id);

    if (deleteResult.affected > 0)
      return {
        code: 200,
        message: '删除成功',
        data: deleteResult,
      };
    else
      return {
        code: 400,
        message: '删除失败',
      };
  }

  // 更新单词
  async updateWord(id: string, updateWordDto) {
    const updateResult = await this.wordRepository.update(id, updateWordDto);

    if (updateResult.affected > 0)
      return {
        code: 200,
        message: '更新成功',
        data: updateResult,
      };
    else
      return {
        code: 400,
        message: '更新失败',
      };
  }
}
