import { z, ZodType } from 'zod/v4';
import { Result, ResultType } from './result';

type ValidationArgument = {
  argument: unknown;
  argumentName: string;
};

const correctTypes = ['string', 'number', 'boolean'] as const;
type CorrectType = (typeof correctTypes)[number];

export class Validation {
  private static _parseSchema(schema: ZodType, argument: unknown): ResultType<void> {
    const { error: parseError } = schema.safeParse(argument);

    return parseError ? Result.fail<void>(z.treeifyError(parseError).errors[0]) : Result.ok<void>();
  }

  static isOneOf(argument: unknown, argumentName: string, options: ReadonlyArray<string>): ResultType<void> {
    const error = `Invalid value for ${argumentName.toLowerCase()}.`;
    const schema = z.enum(options, { error });

    return this._parseSchema(schema, argument);
  }

  static againstNullOrUndefined(argument: unknown, argumentName: string): ResultType<void> {
    return [null, undefined].includes(argument) ? Result.fail<void>(`${argumentName} is required.`) : Result.ok<void>();
  }

  static againstNullOrUndefinedBulk(requests: ValidationArgument[]): ResultType<void> {
    const failedRequests = requests.filter((request) => [null, undefined].includes(request.argument));
    const failedArguments = requests.map((request) => request.argumentName);

    return failedRequests.length > 0
      ? Result.fail<void>(`${failedArguments.slice(0, -1).join(', ')}, and ${failedArguments.slice(-1)} are required.`)
      : Result.ok<void>();
  }

  static isNumeric(argument: unknown, argumentName: string): ResultType<void> {
    const error = `${argumentName} must be numeric.`;
    const numericSchema = z.string().refine((value) => /^\d+$/.test(value), { error });

    return this._parseSchema(numericSchema, argument);
  }

  static isValidDate(argument: unknown, argumentName: string): ResultType<void> {
    const error = `Invalid format for ${argumentName}.`;
    const schema = z.date({ error });

    return this._parseSchema(schema, argument);
  }

  static isCorrectType(argument: unknown, argumentName: string, type: CorrectType): ResultType<void> {
    const error = `${argumentName} must be a ${type}.`;
    let schema: z.ZodType;

    switch (type) {
      case 'string':
        schema = z.string({ error });
        break;
      case 'number':
        schema = z.number({ error });
        break;
      case 'boolean':
        schema = z.boolean({ error });
        break;
      default:
        return Result.fail<void>(`Invalid type for ${argumentName}.`);
    }

    return this._parseSchema(schema, argument);
  }

  static isValidEmail(value: unknown): ResultType<void> {
    const error = `Invalid email format.`;
    const schema = z.email({ error });

    return this._parseSchema(schema, value);
  }

  static isValidStringContains(argument: unknown, argumentName: string, contains: string): ResultType<void> {
    const error = `${argumentName} must contain ${contains}.`;
    const schema = z.string().refine((value) => value.includes(contains), { error });

    return this._parseSchema(schema, argument);
  }

  static inRangeAmount(argument: unknown, argumentName: string, min?: number, max?: number): ResultType<void> {
    let schema = z.number();

    if (min) {
      const error = `${argumentName} must be greater than ${min}.`;
      schema = schema.min(min, { error });
    }

    if (max) {
      const error = `${argumentName} must be less than ${max}.`;
      schema = schema.max(max, { error });
    }

    return this._parseSchema(schema, argument);
  }

  static inRangeCharacters(argument: unknown, argumentName: string, min?: number, max?: number): ResultType<void> {
    let schema = z.string();

    if (min) {
      const error = `${argumentName} is too short, minimum is ${min} characters.`;
      schema = schema.min(min, { error });
    }

    if (max) {
      const error = `${argumentName} is too long, maximum is ${max} characters.`;
      schema = schema.max(max, { error });
    }

    return this._parseSchema(schema, argument);
  }
}
