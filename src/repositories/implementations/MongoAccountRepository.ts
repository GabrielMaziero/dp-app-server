import { MongoHelper } from "../../config/database";
import { Account } from "../../entities/Account";
import { AccountRepository } from "../protocols/accountRepository";
import { UpdateAccessTokenRepository } from "../protocols/updateAcessTokenRepository";
import { ObjectId } from 'mongodb';
import { AccountModel } from "../interfaces/account-model";


export class MongoAccountRepository implements AccountRepository, UpdateAccessTokenRepository {
  async save(account: Account): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(account)
    return MongoHelper.map(result)
  }

  async findByEmail(email: string): Promise<AccountModel> {
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