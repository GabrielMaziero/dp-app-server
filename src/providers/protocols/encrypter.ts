export interface Encrypter {
  encrypt: (id: string, email: string) => Promise<string>
}