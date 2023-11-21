import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  // statusCode: number;
  success: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: GqlExecutionContext, next: CallHandler) {
    // console.log('context', context.switchToHttp().getResponse());
    // console.log('context', context.getArgs());

    return next.handle().pipe(
      map((data) => {
        console.log('@@@@@@@@@@@@@', data);

        // return data;
        return data;
      }),
    );
  }
}
