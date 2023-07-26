import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditDecreaseCommandHandler } from './commands/handler/credit-decrease.handler';
import { CreditFreezeCommandHandler } from './commands/handler/credit-freeze.handler';
import { CreditIncreaseCommandHandler } from './commands/handler/credit-increase.handler';
import { GetIncomeQueryHandler } from './queries/handler/get-income.handler';
import { CreditFreezedEventHandler } from './events/handler/credit-freezed-.handler';
import { CreditIncreasedEventHandler } from './events/handler/credit-increased-.handler';
import { CreditDecreasedEventHandler } from './events/handler/credit-decreased.handler';
import { CreditRepository } from './repository/credit.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    CreditDecreaseCommandHandler,
    CreditIncreaseCommandHandler,
    CreditFreezeCommandHandler,
    GetIncomeQueryHandler,

    CreditIncreasedEventHandler,
    CreditDecreasedEventHandler,
    CreditFreezedEventHandler,

    CreditRepository
  ],
})
export class AppModule {}
