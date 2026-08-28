import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_ID_HEADER } from '../common/constants';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId =
      (req.headers[REQUEST_ID_HEADER] as string) ?? randomUUID();
    res.setHeader(REQUEST_ID_HEADER, requestId);
    next();
  }
}
