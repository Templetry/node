import { Controller, Get, Param } from "@nestjs/common";
// tpl:if validation
import { Body, Post } from "@nestjs/common";
import { GreetDto } from "./dto/greet.dto";
// tpl:endif
import { HelloService } from "./hello.service";

@Controller("api/hello")
export class HelloController {
  constructor(private readonly hello: HelloService) {}

  @Get(":name")
  greet(@Param("name") name: string): { message: string } {
    return { message: this.hello.greet(name) };
  }

  // tpl:if validation
  @Post()
  greetFromBody(@Body() dto: GreetDto): { message: string } {
    // The body is already valid here: the global pipe rejected anything the
    // DTO does not allow before this method ran.
    return { message: this.hello.greet(dto.name) };
  }
  // tpl:endif
}
