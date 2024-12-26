import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  author_id: string;

  @IsString()
  content: string;

  @IsUUID()
  resource_id: string;
}
