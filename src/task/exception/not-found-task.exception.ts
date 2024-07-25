import { HttpException, HttpStatus } from "@nestjs/common";

interface Error {
    message?: never
    error?: never
    createdAt?: never
    [k: string]: string;
}

export class NotFoundTaskException extends HttpException {
    constructor(taskId: string, error: Error = null) {
        super({
            message: `Task c id: "${taskId}" не была найдена`,
            error: 'not_found_task_exception',
            createdAt: new Date(),
            ...error,
        },
        HttpStatus.NOT_FOUND
    );
    }
}