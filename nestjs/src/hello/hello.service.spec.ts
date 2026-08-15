import { Test } from "@nestjs/testing";
import { HelloService } from "./hello.service";

describe("HelloService", () => {
  let service: HelloService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HelloService],
    }).compile();
    service = moduleRef.get(HelloService);
  });

  it("greets by name", () => {
    expect(service.greet("Nest")).toBe("Hello, Nest!");
  });
});
