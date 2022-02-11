import { AuthenticationProvider } from "../../providers/authentication-provider";
import { JwtProvider } from "../../providers/jwt-provider";
import { MongoAccountRepository } from "../../repositories/implementations/MongoAccountRepository";
import { LoginAccountController } from "./LoginAccountController";
import { LoginAccountUseCase } from "./LoginAccountUseCase";

const mongoAccountRepository = new MongoAccountRepository();
const jwtProvider = new JwtProvider(process.env.JWT_SECRET)
const authenticationProvider = new AuthenticationProvider(mongoAccountRepository, jwtProvider, mongoAccountRepository)
const loginAccountUseCase = new LoginAccountUseCase(mongoAccountRepository, authenticationProvider);
const loginAccountController = new LoginAccountController(loginAccountUseCase);

export { loginAccountUseCase, loginAccountController }