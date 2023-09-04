import { Controller, Post, Body, Patch } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  // 添加用户信息到配置表
  @Public()
  @Post('add')
  create(@Body() config) {
    return this.configService.create(config);
  }

  // 修改单词显示个数
  @Patch('update/page_size')
  updatePageSize(@Body() body) {
    return this.configService.updatePageSize(body);
  }

  // 修改单词发音类型
  @Patch('update/pronunciation_type')
  updatePronunciationType(@Body() body) {
    return this.configService.updatePronunciationType(body);
  }

  // 修改展示单词的类型
  @Patch('update/is_marked_only')
  updateIsMarkedOnly(@Body() body) {
    return this.configService.updateIsMarkedOnly(body);
  }
}
