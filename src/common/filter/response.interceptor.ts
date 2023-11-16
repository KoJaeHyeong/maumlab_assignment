import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  // statusCode: number;
  success: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('context', context);
    console.log('context', context.switchToHttp());
    console.log('context', context.switchToHttp().getResponse());
    console.log('context', context.switchToHttp().getRequest());

    return next.handle().pipe(
      map((data) => {
        console.log('@@@@@@@@@@@@@', data);

        // return data;
        return data;
      }),
    );
  }
}
