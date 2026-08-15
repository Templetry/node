import { INestApplication } from "@nestjs/common";
// tpl:if validation
import { ValidationPipe } from "@nestjs/common";
// tpl:endif
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("TemplateApp (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    // tpl:if validation
    // The pipe is configured in main.ts, which the test host never runs —
    // so it has to be repeated here or the e2e suite would test a different
    // application from the one that ships.
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    // tpl:endif
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /healthz", () =>
    request(app.getHttpServer()).get("/healthz").expect(200).expect({ status: "ok" }));

  it("GET /api/hello/:name", () =>
    request(app.getHttpServer())
      .get("/api/hello/Nest")
      .expect(200)
      .expect({ message: "Hello, Nest!" }));

  // tpl:if validation
  it("POST /api/hello accepts a valid body", () =>
    request(app.getHttpServer())
      .post("/api/hello")
      .send({ name: "Nest" })
      .expect(201)
      .expect({ message: "Hello, Nest!" }));

  it("POST /api/hello rejects a property the DTO does not declare", () =>
    request(app.getHttpServer())
      .post("/api/hello")
      .send({ name: "Nest", isAdmin: true })
      .expect(400));

  it("POST /api/hello rejects a name that is too long", () =>
    request(app.getHttpServer())
      .post("/api/hello")
      .send({ name: "x".repeat(41) })
      .expect(400));
  // tpl:endif
});
