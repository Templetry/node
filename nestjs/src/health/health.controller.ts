import { Controller, Get } from "@nestjs/common";
// tpl:if environments
import { ConfigService } from "@nestjs/config";
// tpl:endif

@Controller("healthz")
export class HealthController {
  // tpl:if environments
  constructor(private readonly config: ConfigService) {}
  // tpl:endif

  @Get()
  check(): Record<string, string> {
    // tpl:if environments
    return { status: "ok", environment: this.config.get<string>("ENVIRONMENT") ?? "unknown" };
    // tpl:endif
    // tpl:if !environments
    return { status: "ok" };
    // tpl:endif
  }
}
