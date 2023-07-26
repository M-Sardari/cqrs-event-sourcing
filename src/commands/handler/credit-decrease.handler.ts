import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreditDecreaseCommand } from '../impl/credit-decrease.command';
import { CreditRepository } from '../../repository/credit.repository';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

@CommandHandler(CreditDecreaseCommand)
export class CreditDecreaseCommandHandler
  implements ICommandHandler<CreditDecreaseCommand> {
  constructor(
    private readonly repository: CreditRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: CreditDecreaseCommand): Promise<any> {
    const credit = this.publisher.mergeObjectContext(
      await this.repository.findOneById(command.id),
    );

    credit.decrease(command.value);
    credit.commit();
    return credit;
  }
}
