import {
  Resolver,
  Query,
  Arg,
  Field,
  ObjectType,
  ResolverInterface,
  FieldResolver,
  Root
} from "type-graphql";

@ObjectType({ description: "Lisk Transaction" })
export default class Transaction {
  @Field()
  id: string;

  @Field()
  amount: string;

  @Field()
  fee: string;

  @Field()
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

  @Field()
  blockId: string;

  @Field()
  timestamp: number;

  @Field()
  senderId: string;

  @Field({ nullable: true })
  senderName: string;

  @Field()
  senderPublicKey: string;

  @Field()
  senderSecondPublicKey: string;

  @Field()
  recipientId: string;

  @Field()
  recipientPublicKey: string;

  @Field()
  recipientSecondPublicKey: string;

  @Field()
  confirmations: number;

  @Field()
  receivedAt: Date;

  @Field()
  relays: number;

  @Field()
  ready: boolean;
}
