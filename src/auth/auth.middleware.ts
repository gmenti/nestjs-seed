import { Injectable, NestMiddleware, Param, Req } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from 'src/shared/exceptions/authentication.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (id === '123456789') {
      throw new AuthenticationError();
    }
    next();
  }
}
