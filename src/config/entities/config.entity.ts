import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Config {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userName: string;

  @Column()
  pageSize: number;

  @Column()
  pronunciationType: number;

  @Column()
  isMarkedOnly: number;
}
