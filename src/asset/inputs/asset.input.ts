import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateAssetInput {
  @Field()
  symbol: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateAssetInput extends PartialType(CreateAssetInput, InputType) {
  @Field()
  id: string;
}
