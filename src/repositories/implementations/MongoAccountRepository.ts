import { Account } from "../../entities/Account";
import { AccountRepository } from "../protocols/accountRepository";
import { UpdateAccessTokenRepository } from "../protocols/updateAcessTokenRepository";
import { AccountModel } from "../interfaces/account-model";
import { AppDataSource } from "../../config/database";


export class MongoAccountRepository implements AccountRepository, UpdateAccessTokenRepository {
  async save(account: Account): Promise<AccountModel> {
    const db = AppDataSource.getRepository(Account);
    return await db.save(account);
  }

  async findByEmail(email: string): Promise<AccountModel> {
    const db = AppDataSource.getRepository(Account);
    return db.findOneBy({ email })
  }

  async updateAccessToken(id: number, token: string): Promise<void> {
    const db = AppDataSource.getRepository(Account);
    const updateToken = await db.findOneBy({ id });
    updateToken.accessToken = token
    await db.save(updateToken);
    // await accountCollection.updateOne({ _id: new ObjectId(id) }, {
    //   $set: {
    //     accessToken: token
    //   }
    // })
  }

}