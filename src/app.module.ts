import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { LinkModule } from './api/link/link.module';
import { ErrorResponseService } from './common/service/error-response.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LinkModule],
  controllers: [],
  providers: [ErrorResponseService],
})
export class AppModule {}
