import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { AuthenticationError } from '../exceptions/authentication.exception';
import e = require('express');
import { ResourceNotFoundError } from '../exceptions/resource-not-found.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception);
    const error = {
      code: 'UNEXPECTED_ERROR',
      message: 'Internal server failure',
      status: 500,
    };

    if (exception instanceof AuthenticationError) {
      error.code = exception.code;
      error.message = exception.message;
      error.status = 401;
    }

    if (exception instanceof ResourceNotFoundError) {
      error.code = exception.code;
      error.message = exception.message;
      error.status = 404;
    }

    response.status(error.status).json(delete error.status && error);
  }
}
