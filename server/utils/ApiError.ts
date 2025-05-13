export class ApiError extends Error {
  statusCode: number;
  errors: any[];
  stack?: string;

  constructor(
    statusCode: number,
    message: string = "Some Error Occurred",
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
