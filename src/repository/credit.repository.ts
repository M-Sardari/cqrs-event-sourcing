import { Injectable } from '@nestjs/common';
import { EventStore } from 'event-sourcing-nestjs';
import { Credit } from '../models/credit.model';
import { CreditIncreasedEvent } from '../events/impl/credit-increased.event';

@Injectable()
export class CreditRepository {

  constructor(
    private readonly eventStore: EventStore,
  ) {}

  async findOneById(id: string): Promise<Credit> {
    const credit = new Credit(id);
    credit.loadFromHistory(await this.eventStore.getEvents('credit', id));
    return credit;
  }

  async findIncomesById(id: string): Promise<Credit> {
    const credit = new Credit(id);
    let credits = await this.eventStore.getEvents('credit', id)
    credits = credits.filter(credit=> credit.eventName == CreditIncreasedEvent.name)
    credit.loadFromHistory(credits);
    return credit;
  }
}
