import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        // Handle array responses (e.g. findMany) or simple values
        if (Array.isArray(data)) {
          return {
            success: true,
            statusCode,
            message: 'Operation successful',
            data,
          };
        }

        // Handle object responses (flatten them into the root response)
        if (data && typeof data === 'object') {
          const { message, ...rest } = data;
          delete rest.success;
          return {
            success: true,
            statusCode,
            message: message || 'Operation successful',
            ...rest,
          };
        }

        // Handle case where controller returns a primitive or nothing
        return {
          success: true,
          statusCode,
          message: 'Operation successful',
          data,
        };
      }),
    );
  }
}
