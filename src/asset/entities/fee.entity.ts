import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';

@ObjectType()
@Entity()
export class Fee extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Asset)
  @ManyToOne(() => Asset, { lazy: true })
  currency: Asset;

  @Field(() => Float)
  @Column('decimal')
  amount: number;
}
