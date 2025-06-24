import { IEvent } from '@nestjs/cqrs';

export abstract class AppEvent<EventInput extends Record<string, any>> implements IEvent {
  constructor(readonly payload: EventInput) {}
}
