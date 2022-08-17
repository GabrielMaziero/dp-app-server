export interface Encrypter {
  encrypt: (id: number, email: string) => Promise<string>
}