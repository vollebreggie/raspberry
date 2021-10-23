export class ApiResponse<T> {
    constructor(data?: any) {
      this.messages = data.messages;
      this.response = data.response;
    }
    response: T;
    messages: String[];
    getErrorsText(): string {
      return this.messages.map(e => e).join(' ');
    }
    hasErrors(): boolean {
      return this.messages.length > 0;
    }
  }
  
  export class ApiError { code: ErrorCode; text: string; }
  
  export enum ErrorCode {
    UnknownError = 1,
    OrderIsOutdated = 2
  }