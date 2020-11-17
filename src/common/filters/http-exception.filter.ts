import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllHttpExceptionFilter implements ExceptionFilter {

    private readonly Logger: Logger = new Logger(AllHttpExceptionFilter.name);

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: unknown, host: ArgumentsHost) {
        console.log(exception);
        console.log(host);

        const ctx = host.switchToHttp();
        const request: Request = ctx.getRequest();
        const response: Response = ctx.getResponse();

        const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        this.Logger.error(`HttpError: ${message} | statusCode: ${status}`);

        response.status(status).json(
            {
                timestamp: new Date().toISOString(),
                path: request.url,
                error: message
            }
        );
    }


}