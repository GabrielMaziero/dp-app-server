import { Request, Response } from "express";
import { Controller } from "../protocols";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController implements Controller {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, gender, birthday } = request.body;

    try {
      await this.createAccountUseCase.execute({
        name,
        email,
        gender,
        birthday,
        password
      })

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}