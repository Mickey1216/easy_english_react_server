import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  @MinLength(2, { message: '用户名长度不能小于2' })
  @MaxLength(15, { message: '用户名长度不能大于15' })
  readonly userName: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  @MinLength(6, { message: '密码长度不能小于6' })
  @MaxLength(20, { message: '密码长度不能大于20' })
  readonly password: string;
}
