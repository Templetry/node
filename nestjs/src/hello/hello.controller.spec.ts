import { Test } from "@nestjs/testing";
import { HelloController } from "./hello.controller";
import { HelloService } from "./hello.service";

describe("HelloController", () => {
  let controller: HelloController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();
    controller = moduleRef.get(HelloController);
  });

  it("returns the greeting from the service", () => {
    expect(controller.greet("Nest")).toEqual({ message: "Hello, Nest!" });
  });
});
