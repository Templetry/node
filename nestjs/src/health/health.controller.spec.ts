import { Test } from "@nestjs/testing";
// tpl:if environments
import { ConfigModule } from "@nestjs/config";
import { envFilePaths, validateConfig } from "../config/app.config";
// tpl:endif
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("reports ok", async () => {
    const moduleRef = await Test.createTestingModule({
      // tpl:if environments
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: envFilePaths(),
          validate: validateConfig,
        }),
      ],
      // tpl:endif
      controllers: [HealthController],
    }).compile();

    expect(moduleRef.get(HealthController).check().status).toBe("ok");
  });
});
