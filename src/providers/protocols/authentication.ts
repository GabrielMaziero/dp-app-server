
export interface Authentication {
  auth: (email: string) => Promise<authenticationResult>
}

export interface authenticationResult {
  accessToken: string
}