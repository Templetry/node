import { Module } from "@nestjs/common";
// tpl:if environments
import { ConfigModule } from "@nestjs/config";
import { envFilePaths, validateConfig } from "./config/app.config";
// tpl:endif
import { HealthController } from "./health/health.controller";
import { HelloModule } from "./hello/hello.module";

/** TemplateApp root module: it wires feature modules, nothing else. */
@Module({
  imports: [
    // tpl:if environments
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePaths(),
      validate: validateConfig,
    }),
    // tpl:endif
    HelloModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
