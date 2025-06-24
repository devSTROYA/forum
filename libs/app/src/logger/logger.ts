import { ConsoleLogger } from '@nestjs/common';

const ignoredCtx = ['NestFactory', 'RouterExplorer', 'RouterResolver', 'RoutesResolver', 'InstanceLoader'] as const;
const exceptionCtx = ['ExceptionHandler'] as const;

type IgnoredCtx = (typeof ignoredCtx)[number];
type ExceptionCtx = (typeof exceptionCtx)[number];

export class AppLogger extends ConsoleLogger {
  private isIgnoredContexts(context?: string): context is IgnoredCtx {
    return context ? ignoredCtx.includes(context as IgnoredCtx) : false;
  }

  private isExceptionContexts(context?: string): context is ExceptionCtx {
    return context ? exceptionCtx.includes(context as ExceptionCtx) : false;
  }

  log(message: string, context?: string) {
    if (!this.isIgnoredContexts(context)) {
      super.log(message);
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (!this.isIgnoredContexts(context)) {
      this.isExceptionContexts(context) ? super.error(message, undefined, context) : super.error(message);
    }
  }

  warn(message: string, context?: string) {
    if (!this.isIgnoredContexts(context)) {
      super.warn(message, context);
    }
  }

  debug(message: string, context?: string) {
    if (!this.isIgnoredContexts(context)) {
      super.debug(message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (!this.isIgnoredContexts(context)) {
      super.verbose(message, context);
    }
  }
}
