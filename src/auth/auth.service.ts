import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(userName);
    if (user) {
      const hash = createHash('sha256').update(password).digest('hex');
      if (hash === user.password) {
        const { password, ...result } = user;
        return {
          access_token: await this.jwtService.signAsync(result),
          result,
          res: {
            code: 200,
            message: '登录成功',
          },
        };
      } else {
        return {
          code: 1002,
          message: '密码错误',
        };
      }
    }

    throw new UnauthorizedException();
  }
}
