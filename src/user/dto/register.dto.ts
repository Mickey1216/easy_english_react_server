import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Validate,
  // ValidationArguments,
} from 'class-validator';
import { PasswordMatchConstraint } from '../PasswordMatchConstraint';

export class RegisterDto {
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

  @IsNotEmpty({ message: '再次输入密码不能为空' })
  // @Validate(RegisterDto, ['passwordMatch'])
  @Validate(PasswordMatchConstraint, ['password']) // 使用自定义修饰符，将密码属性名称传递给修饰符
  // @PasswordMatchConstraint("password", { message: '两次输入密码不一致' })
  readonly confirmPassword: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  readonly email: string;

  // 自定义验证器方法
  // static passwordMatch(password: string, args: ValidationArguments) {
  //   const [relatedPropertyName] = args.constraints;
  //   const relatedValue = (args.object as any)[relatedPropertyName];
  //   return password === relatedValue; // 返回true表示验证通过，返回false表示验证失败
  // }
}
