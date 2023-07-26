import { StorableEvent } from "event-sourcing-nestjs";

export class CreditFreezedEvent extends StorableEvent {
    eventAggregate = 'credit';
    eventVersion = 1;
  
    constructor(public readonly id: string, public readonly value: number,public readonly ttl: number) {
      super();
    }
  }