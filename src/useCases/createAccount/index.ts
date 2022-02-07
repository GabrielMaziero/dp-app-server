import { BcryptAdapter } from "../../providers/bcrypt-provider";
import { JwtProvider } from "../../providers/jwt-provider";
import { MongoAccountRepository } from "../../repositories/implementations/MongoAccountRepository";
import { CreateAccountController } from "./CreateAccountController";
import { CreateAccountUseCase } from "./CreateAccountUseCase";
import 'dotenv/config'

const mongoAccountRepository = new MongoAccountRepository();
const bcrypt = new BcryptAdapter(12);
const jwtProvider = new JwtProvider(process.env.JWT_SECRET)
const createAccountUseCase = new CreateAccountUseCase(mongoAccountRepository, mongoAccountRepository, bcrypt, jwtProvider);
const createAccountController = new CreateAccountController(createAccountUseCase);

export { createAccountUseCase, createAccountController }