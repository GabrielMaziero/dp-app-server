import { Encrypter } from "./protocols/encrypter";
import jwt from 'jsonwebtoken';

export class JwtProvider implements Encrypter {
  constructor(private readonly secret: string) { }
  async encrypt(id: string, email: string): Promise<string> {
    const accessToken = await jwt.sign({ id, email }, this.secret)
    return accessToken
  }
}