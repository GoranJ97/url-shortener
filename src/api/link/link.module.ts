import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { LinkRepository } from '../../repository/link/link.repository';
import { ErrorResponseService } from '../../common/service/error-response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from '../../entity/link/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService, LinkRepository, ErrorResponseService],
  controllers: [LinkController],
  exports: [LinkService],
})
export class LinkModule {}
