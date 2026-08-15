import { IsString, Length } from "class-validator";

/**
 * The shape a POST /api/hello body must have.
 *
 * The decorators are the contract, not documentation: the global
 * ValidationPipe enforces them before the controller runs, and rejects any
 * property this class does not declare.
 */
export class GreetDto {
  @IsString()
  @Length(1, 40)
  name!: string;
}
