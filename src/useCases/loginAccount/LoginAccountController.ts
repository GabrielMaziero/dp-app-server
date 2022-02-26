import { Request, Response } from "express";
import { Controller } from "../protocols";
import { LoginAccountUseCase } from "./LoginAccountUseCase";

export class LoginAccountController implements Controller {
  constructor(
    private loginAccountUseCase: LoginAccountUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.query;

    try {
      const res = await this.loginAccountUseCase.execute({ email: String(data.email) })

      return response.status(201).send(res);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}