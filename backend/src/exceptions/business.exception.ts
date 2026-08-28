import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Base class for domain/business-rule errors (as opposed to framework/infra errors).
 * Catch this specifically wherever a business failure needs distinct handling.
 */
export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}
