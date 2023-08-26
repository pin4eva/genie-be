import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TradeFilterInput {
  @Field({ nullable: true })
  limit?: number;
  @Field({ nullable: true })
  offset?: number;
  @Field({ nullable: true })
  base_symbol?: string;
  @Field({ nullable: true })
  quote_symbol?: string;
}
