import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'uuid' })
  author_id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'uuid' })
  resource_id: string;
}
