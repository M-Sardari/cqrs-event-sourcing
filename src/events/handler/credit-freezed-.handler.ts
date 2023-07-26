import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreditFreezedEvent } from "../impl/credit-freezed.event";

@EventsHandler(CreditFreezedEvent)
export class CreditFreezedEventHandler implements IEventHandler<CreditFreezedEvent> {
    handle(event: CreditFreezedEvent) {
        console.log('CreditIncreasedEvent',event)
    }
}
