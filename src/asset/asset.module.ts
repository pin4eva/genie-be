import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';

@Module({
  providers: [AssetResolver, AssetService],
  imports: [TypeOrmModule.forFeature([Asset])],
})
export class AssetModule {}
