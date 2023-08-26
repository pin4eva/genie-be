import { Field, Float, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
import { Fee } from './fee.entity';
import { LabelValue } from './label.entity';

@ObjectType()
@Entity()
export class Trade extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Asset)
  @ManyToOne(() => Asset)
  base: Asset;

  @Field(() => Asset)
  @ManyToOne(() => Asset)
  quote: Asset;

  @Field(() => Fee)
  @ManyToOne(() => Fee)
  fee: Fee;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => [LabelValue])
  @OneToMany(() => LabelValue, (label) => label.trade)
  labels: LabelValue[];

  @Field(() => Float)
  @Column({ type: 'decimal' })
  amount: number;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  price: number;

  @Field()
  @Column({ type: 'timestamp' })
  placed_at: Date;
}

@ObjectType()
export class TradeResponse {
  @Field(() => [Trade])
  trades: Trade[];
  @Field()
  total: number;
}
