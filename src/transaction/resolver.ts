import * as t from "lisk-elements";

import {
  Resolver,
  Query,
  Arg,
  ResolverInterface,
  FieldResolver,
  Root
} from "type-graphql";

import Transaction from "./type";

const client = t.APIClient.createMainnetAPIClient();

@Resolver(of => Transaction)
export default class TransactionResolver
  implements ResolverInterface<Transaction> {
  @Query(returns => Transaction, { nullable: true })
  async transaction(@Arg("id") id: string): Promise<Transaction | undefined> {
    const tx: any = await client.transactions.get({ id });
    if (tx.data.length === 0) {
      return null;
    }
    return tx.data[0];
  }

  @Query(returns => [Transaction], {
    description: "Get all the transactions"
  })
  async transactions(): Promise<Transaction[]> {
    const txs = await client.transactions.get({ sort: "timestamp:desc" });
    return txs.data as Transaction[];
  }

  @FieldResolver()
  async senderName(@Root() transaction) {
    const sender: any = await client.accounts.get({ id: transaction.senderId });

    return sender.data.delegate ? sender.data.delegate.username : null;
  }
}
