import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Comment } from './entities';
import { CreateCommentDto } from './dto/create-comment.dto';
import { firstValueFrom } from 'rxjs';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NATS_SERVICE } from 'src/config';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto';
import { CommentsPaginationDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const { author_id, resource_id, content } = createCommentDto;
    try {
      const user = await firstValueFrom(
        this.client.send('user.find.one', author_id),
      );

      if (!user)
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: `User with ${author_id} not found`,
        });

      const task = await firstValueFrom(
        this.client.send('tasks.find.one', resource_id),
      );

      if (!task)
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: `Task with ${author_id} not found`,
        });

      const comment = this.commentsRepository.create({
        author_id,
        resource_id,
        content,
      });
      console.log(comment);
      await this.commentsRepository.save(comment);
      return comment;
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  async getComments(PaginationDto: CommentsPaginationDto) {
    const { resource_id, limit = 10, page = 1 } = PaginationDto;

    try {
      const task = await firstValueFrom(
        this.client.send('tasks.find.one', resource_id),
      );

      if (!task)
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: `Task with ${resource_id} not found`,
        });

      const total = await this.commentsRepository.countBy({
        resource_id,
      });

      return {
        data: await this.commentsRepository.find({
          take: limit,
          skip: (page - 1) * limit,
          where: { resource_id },
        }),
        meta: {
          page: page,
          lastPage: Math.ceil(total / limit),
          total,
        },
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
