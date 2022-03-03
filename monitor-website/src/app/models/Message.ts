
export class Message {
  constructor(message, args) {
    this.message = message;
    this.args = args;
  }

  type: string;
  message: string;
  args: string;
  date: string;
}