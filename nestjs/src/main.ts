import { NestFactory } from "@nestjs/core";
// tpl:if validation
import { ValidationPipe } from "@nestjs/common";
// tpl:endif
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tpl:if validation
  // whitelist strips properties no DTO declares; forbidNonWhitelisted turns
  // them into a 400 instead of dropping them silently, which is the
  // difference between rejecting a typo and ignoring it.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  // tpl:endif

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
