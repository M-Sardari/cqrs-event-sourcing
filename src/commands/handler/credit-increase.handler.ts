import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreditIncreaseCommand } from "../impl/credit-increase.command";
import { CreditRepository } from "../../repository/credit.repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";

@CommandHandler(CreditIncreaseCommand)
export class CreditIncreaseCommandHandler implements ICommandHandler<CreditIncreaseCommand>{

    constructor(
        private readonly repository: CreditRepository,
        private readonly publisher: StoreEventPublisher,
    ) {}
    async execute(command: CreditIncreaseCommand): Promise<any> {
        const credit = this.publisher.mergeObjectContext(
          await this.repository.findOneById(command.id),
        );

        credit.increase(command.value)
        credit.commit();
        return credit
    }
}
