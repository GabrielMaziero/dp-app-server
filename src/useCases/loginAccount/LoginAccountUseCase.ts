import { Account } from "../../entities/Account";
import { HashComparer } from "../../providers/protocols/hasher-comparer";
import { AccountRepository } from "../../repositories/protocols/accountRepository";
import { LoginAccountRequest } from "./LoginAccountDTO";

export class LoginAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private hasherComparer: HashComparer,
  ) { }

  async execute(data: LoginAccountRequest): Promise<Account> {
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        throw new Error(`Campo ${key} vazio`);
      }
    }
    const account = await this.accountRepository.findByEmail(data.email);
    if (!account) {
      throw new Error('User not exists.');
    }
    const isValid = await this.hasherComparer.compare(data.password, account.password)
    if (!isValid) {
      throw new Error('password invalid.');
    }

    return account
  }
}