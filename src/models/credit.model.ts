import { AggregateRoot } from '@nestjs/cqrs';
import { CreditIncreasedEvent } from '../events/impl/credit-increased.event';
import { CreditDecreasedEvent } from '../events/impl/credit-decreased.event';
import { CreditFreezedEvent } from '../events/impl/credit-freezed.event';

export class Credit extends AggregateRoot {
  public readonly id: string;
  public value: number = 0;
  public freezeValue: number = 0;

  constructor(id: string) {
    super();
    this.id = id;
  }

  increase(value) {
    this.apply(new CreditIncreasedEvent(this.id,value))
  }

  onCreditIncreasedEvent(event:CreditIncreasedEvent){
    this.value += event.value
  }

  decrease(value) {
    this.apply(new CreditDecreasedEvent(this.id,value))
  }

  onCreditDecreasedEvent(event:CreditDecreasedEvent){
    this.value -= event.value
  }

  freeze(value,ttl) {
    this.apply(new CreditFreezedEvent(this.id,value,ttl))
  }

  onCreditFreezedEvent(event:CreditFreezedEvent){
    if(event.ttl > new Date().getTime())
    this.freezeValue += event.value
  }

  getBalanceValue(){
    return this.value - this.freezeValue
  }
}
