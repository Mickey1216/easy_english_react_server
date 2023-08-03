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

  @Post('add')
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Post('getAll')
  findAll(@Body() body: any) {
    return this.wordService.findAll(body.belonging);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}