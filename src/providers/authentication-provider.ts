import { AccountRepository } from "../repositories/protocols/accountRepository";
import { UpdateAccessTokenRepository } from "../repositories/protocols/updateAcessTokenRepository";
import { JwtProvider } from "./jwt-provider";
import { Authentication, authenticationResult } from "./protocols/authentication";


export class AuthenticationProvider implements Authentication {
  constructor(
    private accountRepository: AccountRepository,
    private jwtProvider: JwtProvider,
    private updateAcessTokenRepository: UpdateAccessTokenRepository
  ) { }
  async auth(email: string): Promise<authenticationResult> {
    const account = await this.accountRepository.findByEmail(email)
    if (account) {
      const accessToken = await this.jwtProvider.encrypt(account.id, account.email);
      await this.updateAcessTokenRepository.updateAccessToken(account.id, accessToken)
      return {
        accessToken
      }
    }
    return null
  }
}