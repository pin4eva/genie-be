import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { LabelKey, LabelValue } from './entities/label.entity';
import { Fee } from './entities/fee.entity';
import { Trade } from './entities/trade.entity';
import { AssetResolver } from './resolvers/asset.resolver';
import { AssetService } from './services/asset.service';
import { TradeService } from './services/trade.service';
import { TradeResolver } from './resolvers/trade.resolver';

@Module({
  providers: [AssetResolver, AssetService, TradeService, TradeResolver],
  imports: [
    TypeOrmModule.forFeature([Asset, LabelKey, LabelValue, Fee, Trade]),
  ],
})
export class AssetModule {}
