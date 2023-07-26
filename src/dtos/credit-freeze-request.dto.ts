import { CreditIncreaseRqDto } from "./credit-increase-request.dto copy";

export interface CreditFreezeRqDto extends CreditIncreaseRqDto {
    ttl:number
}
