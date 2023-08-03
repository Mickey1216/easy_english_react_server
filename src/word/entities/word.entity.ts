import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Word {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  word: string;

  @Column()
  pronunciation: string;

  @Column()
  explanation: string;

  @Column()
  sentence: string;

  @Column()
  note: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column()
  belonging: string;

  @Column()
  mark: number;
}
