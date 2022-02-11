import { JwtProvider } from "../../providers/jwt-provider";
import { MongoAccountRepository } from "../../repositories/implementations/MongoAccountRepository";
import { CreateAccountController } from "./CreateAccountController";
import { CreateAccountUseCase } from "./CreateAccountUseCase";
import 'dotenv/config'
import { AuthenticationProvider } from "../../providers/authentication-provider";

const mongoAccountRepository = new MongoAccountRepository();
const jwtProvider = new JwtProvider(process.env.JWT_SECRET)
const authenticationProvider = new AuthenticationProvider(mongoAccountRepository, jwtProvider, mongoAccountRepository)
const createAccountUseCase = new CreateAccountUseCase(mongoAccountRepository, authenticationProvider);
const createAccountController = new CreateAccountController(createAccountUseCase);

export { createAccountUseCase, createAccountController }