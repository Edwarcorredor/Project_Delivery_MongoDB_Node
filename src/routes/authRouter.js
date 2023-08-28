import { Router } from "express";
import { login } from "../controllers/AuthController.js";
import passport from "passport";

const routerLogin = Router();

routerLogin.post(
  "/",
  passport.authenticate("local", { session: false }),
  login
);
// router.post("/logout", logOut);

export default routerLogin;
