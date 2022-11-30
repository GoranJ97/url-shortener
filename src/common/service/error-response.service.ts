import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { CustomConflictException } from '../exception/custom-conflict.exception';
import { CustomBadRequestException } from '../exception/custom-bad-request.exception';

@Injectable()
export class ErrorResponseService {
  throwError(err) {
    if (err instanceof CustomConflictException || ConflictException) {
      throw err;
    }

    if (err instanceof CustomBadRequestException) {
      throw err;
    }

    if (err instanceof EntityNotFoundError) {
      throw new NotFoundException();
    }

    if (err instanceof NotFoundException) {
      throw err;
    }

    if (err instanceof UnauthorizedException) {
      throw err;
    }

    switch (err.code) {
      case 'ER_NO_REFERENCED_ROW_2':
        throw new NotFoundException('Reference not found');

      case 'ER_DUP_ENTRY':
        throw new ConflictException('Duplicate entry');

      case 'WARN_DATA_TRUNCATED':
        throw new PayloadTooLargeException();

      default:
        throw new InternalServerErrorException('Internal server error');
    }
  }
}
