import { Account } from "../../entities/Account";

export interface AccountRepository {
  findByEmail(email: string): Promise<Account>;
  save(account: Account): Promise<void>;
  get(email: string): Promise<Account>;
}