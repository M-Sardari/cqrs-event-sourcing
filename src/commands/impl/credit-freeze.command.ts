export class CreditFreezeCommand {
    constructor(public readonly id: string, public readonly value: number,public readonly ttl: number) {}
  }
  