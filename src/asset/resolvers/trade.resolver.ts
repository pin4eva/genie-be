import { Args, Query, Resolver } from '@nestjs/graphql';
import { TradeResponse } from '../entities/trade.entity';
import { TradeFilterInput } from '../inputs/trade.input';
import { TradeService } from '../services/trade.service';

@Resolver()
export class TradeResolver {
  constructor(private readonly tradeService: TradeService) {}

  @Query(() => TradeResponse)
  getTrades(@Args('filter', { nullable: true }) filter?: TradeFilterInput) {
    return this.tradeService.getTrades(filter);
  }
}
