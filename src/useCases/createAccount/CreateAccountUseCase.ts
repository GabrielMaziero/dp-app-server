import { Account } from "../../entities/Account";
import { JwtProvider } from "../../providers/jwt-provider";
import { Hasher } from "../../providers/protocols/hasher";
import { AccountRepository } from "../../repositories/protocols/accountRepository";
import { UpdateAccessTokenRepository } from "../../repositories/protocols/updateAcessTokenRepository";
import { CreateAccountRequest } from "./CreateAccountDTO";

export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private updateAcessTokenRepository: UpdateAccessTokenRepository,
    private hasher: Hasher,
    private jwtProvider: JwtProvider
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

    const id = await this.accountRepository.save(user);
    const token = await this.jwtProvider.encrypt(id, user.email);

    await this.updateAcessTokenRepository.updateAccessToken(id, token)
  }
}