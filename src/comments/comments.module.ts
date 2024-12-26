import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { NatsModule } from 'src/transports/nats.module';
import { Comment } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), NatsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
