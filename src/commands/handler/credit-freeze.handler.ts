import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreditRepository } from "../../repository/credit.repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { CreditFreezeCommand } from "../impl/credit-freeze.command";
import { ConflictException } from "@nestjs/common";

@CommandHandler(CreditFreezeCommand)
export class CreditFreezeCommandHandler implements ICommandHandler<CreditFreezeCommand>{

    constructor(
        private readonly repository: CreditRepository,
        private readonly publisher: StoreEventPublisher,
    ) {}
    async execute(command: CreditFreezeCommand): Promise<any> {
        const credit = this.publisher.mergeObjectContext(
          await this.repository.findOneById(command.id),
        );

        if(credit.freezeValue > 0) throw new ConflictException('Already freezed')
        if(command.value > credit.value) throw new ConflictException('reqeust value more than available credit')

        const expireDate = new Date().getTime() + (command.ttl * 1000)
        console.log(expireDate);
        
        credit.freeze(command.value,expireDate)
        credit.commit();
        return credit
    }
}
