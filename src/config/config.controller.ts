import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('add')
  create(@Body() config) {
    return this.configService.create(config);
  }
}
