import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreditDecreasedEvent } from "../impl/credit-decreased.event";

@EventsHandler(CreditDecreasedEvent)
export class CreditDecreasedEventHandler implements IEventHandler<CreditDecreasedEvent> {
    handle(event: CreditDecreasedEvent) {
        console.log('CreditDecreasedEvent',event)
    }
}
