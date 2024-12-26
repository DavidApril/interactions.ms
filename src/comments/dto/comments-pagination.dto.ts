import { IsString, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/shared/dto';

export class CommentsPaginationDto extends PaginationDto {
  @IsString()
  @IsUUID()
  resource_id: string;
}
