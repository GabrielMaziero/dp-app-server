import { Account } from "../../entities/Account";
import { Hasher } from "../../providers/protocols/hasher";
import { AccountRepository } from "../../repositories/protocols/accountRepository";
import { CreateAccountRequest } from "./CreateAccountDTO";

export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private hasher: Hasher,
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


    const hashedPassword = await this.hasher.hash(data.password)
    const user = new Account({ ...data, password: hashedPassword });

    await this.accountRepository.save(user);

  }
}