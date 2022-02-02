import { Request, Response } from "express";
import { Controller } from "../protocols";
import { LoginAccountUseCase } from "./LoginAccountUseCase";

export class LoginAccountController implements Controller {
  constructor(
    private loginAccountUseCase: LoginAccountUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const res = await this.loginAccountUseCase.execute({
        email,
        password
      })

      return response.status(201).send(res);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}