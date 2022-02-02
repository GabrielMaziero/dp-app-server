import { BcryptAdapter } from "../../providers/bcrypt-provider";
import { MongoAccountRepository } from "../../repositories/implementations/MongoAccountRepository";
import { LoginAccountController } from "./LoginAccountController";
import { LoginAccountUseCase } from "./LoginAccountUseCase";

const mongoAccountRepository = new MongoAccountRepository();
const bcrypt = new BcryptAdapter(12);
const loginAccountUseCase = new LoginAccountUseCase(mongoAccountRepository, bcrypt);
const loginAccountController = new LoginAccountController(loginAccountUseCase);

export { loginAccountUseCase, loginAccountController }