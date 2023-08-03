import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 注册
  async register(body) {
    const { userName, password, email } = body;
    if (
      (await this.checkUserName(userName)) ||
      (await this.checkEmail(email))
    ) {
      return {
        code: 1001,
        message: '用户已存在（用户名和邮箱唯一）',
      };
    }

    try {
      const register = new User();
      register.userName = userName;
      register.password = password;
      register.email = email;
      await this.userRepository.save(register);
      return {
        code: 200,
        message: '注册成功',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // 在用户注册时，检测该用户名是否已经注册过
  async checkUserName(userName: string) {
    if (
      !(await this.userRepository.findOne({
        where: { userName },
      }))
    ) {
      return false;
    }
    return true;
  }

  // 在用户注册时，检测该用户的邮箱是否已经注册过
  async checkEmail(email: string) {
    if (
      !(await this.userRepository.findOne({
        where: { email },
      }))
    ) {
      return false;
    }
    return true;
  }

  // 根据用户名查找用户
  async findOneByUserName(userName: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { userName } });
  }
}
