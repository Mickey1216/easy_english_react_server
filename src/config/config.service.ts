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
}
