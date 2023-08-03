import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateWordDto {
  @IsString()
  @MinLength(1, { message: '单词不能为空' })
  word: string;

  @IsString()
  pronunciation: string;

  @IsString()
  explanation: string;

  @IsString()
  sentence: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  belonging: string;

  @IsNumber()
  mark: number;
}
