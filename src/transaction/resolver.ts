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
    description: "Get all transactions. Newest first"
  })
  async transactions(
    @Arg("liskId", { nullable: true }) liskId?: string
  ): Promise<Transaction[]> {
    const txs = await client.transactions.get({
      sort: "timestamp:desc",
      ...(liskId && { senderIdOrRecipientId: liskId })
    });

    return txs.data as Transaction[];
  }

  @FieldResolver()
  async senderName(@Root() transaction) {
    const sender: any = await client.accounts.get({
      address: transaction.senderId
    });

    return sender && sender.data && sender.data[0].delegate
      ? sender.data[0].delegate.username
      : null;
  }
  @FieldResolver()
  async recipientName(@Root() transaction) {
    const recipient: any = await client.accounts.get({
      address: transaction.recipientId
    });

    return recipient && recipient.data && recipient.data[0].delegate
      ? recipient.data[0].delegate.username
      : null;
  }
}
