import { Args, Query, Resolver } from '@nestjs/graphql';
import { TradeService } from '../services/trade.service';
import { Trade } from '../entities/trade.entity';
import { TradeFilterInput } from '../inputs/trade.input';

@Resolver()
export class TradeResolver {
  constructor(private readonly tradeService: TradeService) {}

  @Query(() => [Trade])
  getTrades(@Args('filter', { nullable: true }) filter?: TradeFilterInput) {
    return this.tradeService.getTrades(filter);
  }
}
