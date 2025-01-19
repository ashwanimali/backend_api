import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        console.log("request line 17")
        const token = request.headers['Authorization'];
        console.log("in interceptor", token)

        return next.handle()
            .pipe(
                map((res) => {

                    return res;
                }),
            );
    }
}
