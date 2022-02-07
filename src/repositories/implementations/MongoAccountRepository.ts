import { MongoHelper } from "../../config/database";
import { Account } from "../../entities/Account";
import { AccountRepository } from "../protocols/accountRepository";
import { UpdateAccessTokenRepository } from "../protocols/updateAcessTokenRepository";
import { ObjectId } from 'mongodb';


export class MongoAccountRepository implements AccountRepository, UpdateAccessTokenRepository {
  async save(account: Account): Promise<string> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    return (await accountCollection.insertOne(account)).insertedId.toString()
  }

  async findByEmail(email: string): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }

}