import { Request, Response } from "express";
import { Controller } from "../protocols";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController implements Controller {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, gender, birthday } = request.body;

    try {
      const result = await this.createAccountUseCase.execute({
        name,
        email,
        gender,
        birthday,
      })

      return response.status(201).send(result);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}