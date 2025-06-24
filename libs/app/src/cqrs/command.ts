import { Command, ICommand } from '@nestjs/cqrs';

export abstract class AppCommand<CommandInput extends Record<string, any>, CommandOutput>
  extends Command<CommandOutput>
  implements ICommand
{
  constructor(readonly payload: CommandInput = {} as CommandInput) {
    super();
  }
}
