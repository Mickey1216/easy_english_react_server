import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { createHash } from 'crypto';
import { IsOptional } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 64, default: 'leaf.jpg' })
  @IsOptional()
  avatarSrc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  // 在密码存入数据库之前，对密码进行加密
  @BeforeInsert()
  brforeInsert() {
    this.password = createHash('sha256').update(this.password).digest('hex');
  }
}
