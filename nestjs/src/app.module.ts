import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { HelloModule } from "./hello/hello.module";

/** TemplateApp root module: it wires feature modules, nothing else. */
@Module({
  imports: [HelloModule],
  controllers: [HealthController],
})
export class AppModule {}
