import { Injectable } from '@nestjs/common';
import datasource from 'datasource';
import { User } from './user/user.entity';
import { Trade } from './asset/entities/trade.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Fee } from './asset/entities/fee.entity';
import { LabelKey, LabelValue } from './asset/entities/label.entity';
import { Asset } from './asset/entities/asset.entity';
import userJSON from './db/users.json';
import assetJSON from './db/assets.json';
import labelKeyJSON from './db/labelKeys.json';
import labelValueJSON from './db/labelValues.json';
import feeJSON from './db/fees.json';
import tradeJSON from './db/trades.json';

@Injectable()
export class AppService {
  constructor(@InjectDataSource(datasource) private readonly db: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }

  async seedDatabase() {
    try {
      const tradeRepo = this.db.getRepository(Trade);
      const userRepo = this.db.getRepository(User);
      const feeRepo = this.db.getRepository(Fee);
      const labelKeyRepo = this.db.getRepository(LabelKey);
      const labelValueRepo = this.db.getRepository(LabelValue);
      const assetRepo = this.db.getRepository(Asset);

      // create users

      const users = userRepo.create(userJSON as User[]);

      // create assets
      const assets = assetRepo.create(assetJSON as Asset[]);

      // create label keys
      const labelKeys = labelKeyRepo.create(labelKeyJSON as LabelKey[]);

      // create fees
      const fees = feeRepo.create(
        feeJSON.map((fee) => {
          const currency = new Asset();
          currency.id = fee.currency_id;

          return {
            amount: fee.amount,
            currency: currency,
            id: fee.id,
          } as unknown as Fee;
        }),
      );

      // create trades
      const trades = tradeRepo.create(
        tradeJSON.map((trade) => {
          const base = new Asset();
          base.id = trade.base_id;
          const quote = new Asset();
          quote.id = trade.quote_id;
          const fee = new Fee();
          fee.id = trade.fee_id;
          const user = new User();
          user.id = trade.user_id;

          return {
            base,
            quote,
            fee,
            user,
            amount: trade.amount,
            price: trade.price,
            id: trade.id,
            placed_at: trade.placed_at,
          } as unknown as Trade;
        }),
      );

      // create label values
      const labelValues = labelValueRepo.create(
        labelValueJSON.map((label) => {
          const trade = new Trade();
          trade.id = label.trade_id;

          return {
            id: label.id,
            trade,
            value: label.value,
          };
        }),
      );

      await Promise.all([
        await userRepo.insert(users),
        await assetRepo.insert(assets),
        await labelKeyRepo.insert(labelKeys),
        await feeRepo.insert(fees),
        await tradeRepo.insert(trades),
        await labelValueRepo.insert(labelValues),
      ]);

      return 'Database seed complete';
    } catch (e) {
      throw e;
    }
  }
}
