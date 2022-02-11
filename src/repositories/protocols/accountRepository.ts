import { Account } from "../../entities/Account";
import { AccountModel } from "../interfaces/account-model";

export interface AccountRepository {
  findByEmail(email: string): Promise<AccountModel>;
  save(account: Account): Promise<AccountModel>;
}