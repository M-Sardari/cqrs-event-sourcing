import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreditIncreasedEvent } from "../impl/credit-increased.event";

@EventsHandler(CreditIncreasedEvent)
export class CreditIncreasedEventHandler implements IEventHandler<CreditIncreasedEvent> {
    handle(event: CreditIncreasedEvent) {
        console.log('CreditIncreasedEvent',event)
    }
}
