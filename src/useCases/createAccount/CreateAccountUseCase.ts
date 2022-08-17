import { Account } from "../../entities/Account";
import { AuthenticationProvider } from "../../providers/authentication-provider";
import { AccountRepository } from "../../repositories/protocols/accountRepository";
import { CreateAccountRequest } from "./CreateAccountDTO";

export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private authenticationProvider: AuthenticationProvider,
  ) { }

  async execute(data: CreateAccountRequest) {
    const userAlreadyExists = await this.accountRepository.findByEmail(data.email);

    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        throw new Error(`Campo ${key} vazio`);
      }
    }

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new Account();
    user.name = data.name
    user.email = data.email
    user.birthday = data.birthday
    user.gender = data.gender
    await this.accountRepository.save(user);
    const authenticationModel = await this.authenticationProvider.auth(user.email)

    if (!authenticationModel) {
      throw new Error('Error generating token.');
    }
    return authenticationModel
  }
}