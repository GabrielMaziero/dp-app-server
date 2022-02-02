export interface CreateAccountRequest {
  name: string
  email: string
  gender?: string
  birthday?: string
  password: string
}