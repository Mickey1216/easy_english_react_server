import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  // 添加用户信息到配置表
  @Post('add')
  create(@Body() config) {
    return this.configService.create(config);
  }

  // 修改单词显示个数
  // @UseGuards(AuthGuard)
  @Patch('update/page_size')
  updatePageSize(@Body() body) {
    return this.configService.updatePageSize(body);
  }

  // 修改单词发音类型
  // @UseGuards(AuthGuard)
  @Patch('update/pronunciation_type')
  updatePronunciationType(@Body() body) {
    return this.configService.updatePronunciationType(body);
  }

  // 修改展示单词的类型
  // @UseGuards(AuthGuard)
  @Patch('update/is_marked_only')
  updateIsMarkedOnly(@Body() body) {
    return this.configService.updateIsMarkedOnly(body);
  }
}
