import { StorableEvent } from "event-sourcing-nestjs";

export class CreditDecreasedEvent extends StorableEvent {
    eventAggregate = 'credit';
    eventVersion = 1;
  
    constructor(public readonly id: string, public readonly value: number) {
      super();
    }
  }