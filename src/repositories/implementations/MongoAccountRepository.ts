import { Account } from "../../entities/Account";
import { AccountRepository } from "../protocols/accountRepository";
import AccountMongo from './model/account';

export class MongoAccountRepository implements AccountRepository {
  async save(account: Account): Promise<void> {
    const accountMongo = await AccountMongo.create(account)
    console.log(accountMongo)
  }

  async get(email: string): Promise<Account> {
    const account = await AccountMongo.findOne({ email })
    return account
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await AccountMongo.findOne({ email })
    return account
  }
}