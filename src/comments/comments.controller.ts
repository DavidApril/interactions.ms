import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { CommentsPaginationDto } from './dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern('comments.create')
  create(@Payload() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @MessagePattern('comments.find.all')
  findAllById(@Payload() commentsPaginationDto: CommentsPaginationDto) {
    return this.commentsService.getComments(commentsPaginationDto);
  }
}
