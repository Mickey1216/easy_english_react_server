import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
// import { PasswordMatchConstraint } from './PasswordMatchConstraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // 处理文件上传
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../public/images'),
        filename: (_, file, callback) => {
          const fileName = `${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService /*PasswordMatchConstraint*/],
  exports: [UserService, AuthService],
})
export class UserModule {}
