import {
  Resolver,
  Query,
  Arg,
  ResolverInterface,
  FieldResolver,
  Root
} from "type-graphql";

import Transaction from "./type";

import liskClient from "../api";
import { getNameFromAddress } from "../delegate-resolver";

@Resolver(of => Transaction)
export default class TransactionResolver
  implements ResolverInterface<Transaction> {
  @Query(returns => Transaction, { nullable: true })
  async transaction(@Arg("id") id: string): Promise<Transaction | undefined> {
    const tx: any = await liskClient.transactions.get({ id });
    if (tx.data.length === 0) {
      return null;
    }
    return tx.data[0];
  }

  @Query(returns => [Transaction], {
    description: "Get all transactions. Newest first"
  })
  async transactions(
    @Arg("liskId", { nullable: true }) liskId?: string
  ): Promise<Transaction[]> {
    const txs = await liskClient.transactions.get({
      sort: "timestamp:desc",
      limit: 20,
      ...(liskId && { senderIdOrRecipientId: liskId })
    });

    return txs.data as Transaction[];
  }

  @FieldResolver()
  async senderName(@Root() transaction) {
    return getNameFromAddress(transaction.senderId);
  }
  @FieldResolver()
  async recipientName(@Root() transaction) {
    return getNameFromAddress(transaction.recipientId);
  }
}
