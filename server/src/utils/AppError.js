/**
 * Custom error class for handling operational errors in the application.
 * Extends the built-in Error class to include:
 *
 * - statusCode: HTTP status code (e.g., 400, 404, 500)
 * - status: Derived status ("fail" for 4xx errors, "error" for 5xx errors)
 *
 * Helps in creating consistent and structured error responses across the app.
 */
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        Error.captureStackTrace(this, this.constructor);
    }
}