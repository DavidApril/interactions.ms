import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'interactions-database',
      port: 27017,
      database: 'interactionsdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommentsModule,
  ],
})
export class AppModule {}
