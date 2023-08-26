import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Asset } from '../entities/asset.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AssetFilterInput,
  CreateAssetInput,
  UpdateAssetInput,
} from '../inputs/asset.input';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset) private readonly assetRepo: Repository<Asset>,
  ) {}

  // create asset
  async createAsset(input: CreateAssetInput): Promise<Asset> {
    const { name, symbol } = input;
    try {
      const existingAsset = await this.assetRepo.findOne({
        where: [{ symbol }, { name }],
      });
      if (existingAsset) throw new BadRequestException('Asset already exist');

      const asset = new Asset();
      Object.assign(asset, input);

      await this.assetRepo.save(asset);

      return asset;
    } catch (error) {
      throw error;
    }
  }

  // update asset
  async updateAsset(input: UpdateAssetInput): Promise<Asset> {
    try {
      const asset = await this.assetRepo.findOne({ where: { id: input.id } });
      if (!asset) throw new NotFoundException('No matching record for asset');

      Object.assign(asset, input);

      await asset.save();

      return asset;
    } catch (error) {
      throw error;
    }
  }

  // get assets
  async getAssets(input?: AssetFilterInput) {
    try {
      const limit = input?.limit || 20;

      const assets = this.assetRepo.createQueryBuilder('asset').limit(limit);

      if (input?.symbol) {
        assets.where('LOWER(asset.symbol) like :symbol ', {
          symbol: input.symbol.toLowerCase(),
        });
      }

      return assets.getMany();
    } catch (error) {
      throw error;
    }
  }

  // get asset
  async getAssetById(id: string): Promise<Asset> {
    try {
      const asset = await this.assetRepo.findOne({ where: { id } });
      if (!asset) throw new NotFoundException('No matching record for asset');

      return asset;
    } catch (error) {
      throw error;
    }
  }

  // delete asset
  async deleteAsset(id: string): Promise<Asset> {
    try {
      const asset = await this.assetRepo.findOne({ where: { id } });
      if (!asset) throw new NotFoundException('No matching record for asset');

      await this.assetRepo.delete({ id });
      return asset;
    } catch (error) {
      throw error;
    }
  }
}
