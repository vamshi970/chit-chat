type ResponseData = Record<string, any> | Record<string, any>[];

export class ApiResponse {
  statusCode: number;
  data: ResponseData;
  message: string;
  success : boolean

  constructor(statusCode: number, data: ResponseData, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400
  }
}
