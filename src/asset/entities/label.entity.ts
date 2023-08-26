import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trade } from './trade.entity';

@ObjectType()
@Entity()
export class LabelKey extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar' })
  name: string;
}

@ObjectType()
@Entity()
export class LabelValue extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => LabelKey)
  @ManyToOne(() => LabelKey, { lazy: true })
  @Field()
  @Column('varchar')
  value: string;

  @ManyToOne(() => Trade)
  trade: Trade;
}
