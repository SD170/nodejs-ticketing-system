import { Error } from 'mongoose';

// custom error
class ErrorResponse extends Error {
    // fields
    statusCode: string | undefined;

    constructor(errorMessage: string, statusCode: string | undefined) {
        super(errorMessage);
        this.statusCode = statusCode;
    }
}

export default ErrorResponse;