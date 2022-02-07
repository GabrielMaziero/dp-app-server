import { Request, Response, Router } from "express";
import passport from 'passport';
import { createAccountController } from "./useCases/createAccount";
import { loginAccountController } from "./useCases/loginAccount";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { user } = req;
  return res.json({ user })
})

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/logout', (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

router.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  (req: Request, res: Response) => {
    res.redirect('/api');
  });

router.post('/users', (req: Request, res: Response) => createAccountController.handle(req, res))

router.get('/users', (req: Request, res: Response) => loginAccountController.handle(req, res))

export default router;