import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade } from '../entities/trade.entity';
import { TradeFilterInput } from '../inputs/trade.input';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade) private readonly tradeRepo: Repository<Trade>,
  ) {}

  // get trades
  async getTrades(input?: TradeFilterInput) {
    try {
      // const trades = await this.tradeRepo.find({
      //   relations: {
      //     base: true,
      //     quote: true,
      //     fee: true,
      //     user: true,
      //     labels: true,
      //   },
      // });
      const limit = input?.limit || 50;
      const trades = this.tradeRepo
        .createQueryBuilder('trade')
        .leftJoinAndSelect('trade.base', 'base')
        .leftJoinAndSelect('trade.quote', 'quote')
        .leftJoinAndSelect('trade.fee', 'fee')
        .leftJoinAndSelect('trade.labels', 'labels')
        .leftJoinAndSelect('trade.user', 'user')
        .limit(limit);

      if (input?.base_symbol) {
        trades.where('LOWER(base.symbol) like :base_symbol', {
          base_symbol: input.base_symbol?.toLowerCase(),
        });
      }
      if (input?.quote_symbol) {
        trades.andWhere('LOWER(quote.symbol) like :quote_symbol', {
          quote_symbol: input.quote_symbol?.toLowerCase(),
        });
      }
      trades.orderBy('trade.placed_at', 'DESC');

      return trades.getMany();
    } catch (error) {
      throw error;
    }
  }
  // get trade by id
  async getTradeById(id: string) {
    try {
      const trade = await this.tradeRepo.findOne({ where: { id } });
      if (!trade) throw new NotFoundException('No matching record found');

      return trade;
    } catch (error) {
      throw error;
    }
  }

  async getTradesByAssetSymbol(symbol: string) {
    try {
      const trades = this.tradeRepo
        .createQueryBuilder('trade')
        .where('LOWER(trade.base.symbol) like :symbol', { symbol })
        .getMany();

      return trades;
    } catch (error) {
      throw error;
    }
  }
}
