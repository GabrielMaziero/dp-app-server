import { Account } from "../../entities/Account";
import { AuthenticationProvider } from "../../providers/authentication-provider";
import { AccountRepository } from "../../repositories/protocols/accountRepository";
import { LoginAccountRequest } from "./LoginAccountDTO";

export class LoginAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private authenticationProvider: AuthenticationProvider,
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
    
    await this.authenticationProvider.auth(account.email)

    return account
  }
}