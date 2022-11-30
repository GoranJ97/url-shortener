import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class LinkDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  link: string;
}
