import { Injectable } from "@nestjs/common";

/** Where the behaviour lives. Controllers stay about HTTP. */
@Injectable()
export class HelloService {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
