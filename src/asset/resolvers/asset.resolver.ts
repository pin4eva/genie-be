import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetService } from '../services/asset.service';
import { Asset } from '../entities/asset.entity';
import {
  AssetFilterInput,
  CreateAssetInput,
  UpdateAssetInput,
} from '../inputs/asset.input';

@Resolver()
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  // create asset
  @Mutation(() => Asset)
  createAsset(@Args('input') input: CreateAssetInput) {
    return this.assetService.createAsset(input);
  }

  // update asset
  @Mutation(() => Asset)
  updateAsset(@Args('input') input: UpdateAssetInput) {
    return this.assetService.updateAsset(input);
  }

  // get assets
  @Query(() => [Asset])
  getAssets(@Args('filter', { nullable: true }) filter: AssetFilterInput) {
    return this.assetService.getAssets(filter);
  }

  // get asset
  @Query(() => Asset)
  getAssetById(@Args('id') id: string) {
    return this.assetService.getAssetById(id);
  }

  // delete asset
  @Mutation(() => Asset) // frontend can pick any field from the Asset Type
  deleteAsset(@Args('id') id: string) {
    return this.assetService.deleteAsset(id);
  }
}
