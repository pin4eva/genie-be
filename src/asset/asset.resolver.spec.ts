import { Test, TestingModule } from '@nestjs/testing';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';

describe('AssetResolver', () => {
  let resolver: AssetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetResolver, AssetService],
    }).compile();

    resolver = module.get<AssetResolver>(AssetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
