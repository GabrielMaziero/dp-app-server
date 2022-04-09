import { Request, Response, Router } from "express";
import { createAccountController } from "./useCases/createAccount";
import { loginAccountController } from "./useCases/loginAccount";

const router = Router();

router.post('/users', (req: Request, res: Response) => createAccountController.handle(req, res))

router.get('/users', (req: Request, res: Response) => loginAccountController.handle(req, res))

export default router;