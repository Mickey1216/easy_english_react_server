import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  create(config: Config) {
    // 设置默认值
    config.pageSize = 10;
    config.pronunciationType = 0;
    config.isMarkedOnly = 0;

    return this.configRepository.save(config);
  }

  // 修改单词显示个数
  async updatePageSize(body) {
    const page_size = parseInt(body.page_size);
    const user = await this.configRepository.findOne({
      where: { userName: body.userName },
    });
    if (!user) {
      return {
        code: 1001,
        msg: '用户不存在',
      };
    }
    const { id } = user; // 获取用户文档的_id字段
    const updateResult = await this.configRepository.update(id, {
      pageSize: page_size,
    });
    if (updateResult.affected > 0) {
      return {
        code: 200,
        msg: '修改成功',
      };
    } else {
      return {
        code: 1002,
        msg: '修改失败',
      };
    }
  }

  // 修改单词发音类型
  async updatePronunciationType(body) {
    const pronunciation_type = parseInt(body.pronunciation);
    const user = await this.configRepository.findOne({
      where: { userName: body.userName },
    });
    if (!user) {
      return {
        code: 1001,
        msg: '用户不存在',
      };
    }
    const { id } = user; // 获取用户文档的_id字段
    const updateResult = await this.configRepository.update(id, {
      pronunciationType: pronunciation_type,
    });
    if (updateResult.affected > 0) {
      return {
        code: 200,
        msg: '修改成功',
      };
    } else {
      return {
        code: 1002,
        msg: '修改失败',
      };
    }
  }

  // 修改展示单词的类型
  async updateIsMarkedOnly(body) {
    const is_marked_only = parseInt(body.show_type);
    const user = await this.configRepository.findOne({
      where: { userName: body.userName },
    });
    if (!user) {
      return {
        code: 1001,
        msg: '用户不存在',
      };
    }
    const { id } = user; // 获取用户文档的_id字段
    const updateResult = await this.configRepository.update(id, {
      isMarkedOnly: is_marked_only,
    });
    if (updateResult.affected > 0) {
      return {
        code: 200,
        msg: '修改成功',
      };
    } else {
      return {
        code: 1002,
        msg: '修改失败',
      };
    }
  }
}
