import { StorableEvent } from "event-sourcing-nestjs";

export class CreditIncreasedEvent extends StorableEvent {
    eventAggregate = 'credit';
    eventVersion = 1;
  
    constructor(public readonly id: string, public readonly value: number) {
      super();
    }
  }