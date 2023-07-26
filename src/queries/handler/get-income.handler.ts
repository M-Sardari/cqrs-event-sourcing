import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CreditRepository } from "../../repository/credit.repository";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { GetIncomeQuery } from "../impl/get-income.query";

@QueryHandler(GetIncomeQuery)
export class GetIncomeQueryHandler implements IQueryHandler<GetIncomeQuery> {
  constructor(
    private readonly repository: CreditRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: GetIncomeQuery): Promise<any> {
    return this.publisher.mergeObjectContext(
      await this.repository.findOneById(command.id),
    );

    // return credit.getBalanceValue()
  }
}
