import { BcryptAdapter } from "../../providers/bcrypt-provider";
import { MongoAccountRepository } from "../../repositories/implementations/MongoAccountRepository";
import { CreateAccountController } from "./CreateAccountController";
import { CreateAccountUseCase } from "./CreateAccountUseCase";


const mongoAccountRepository = new MongoAccountRepository();
const bcrypt = new BcryptAdapter(12);
const createAccountUseCase = new CreateAccountUseCase(mongoAccountRepository, bcrypt);
const createAccountController = new CreateAccountController(createAccountUseCase);

export { createAccountUseCase, createAccountController }