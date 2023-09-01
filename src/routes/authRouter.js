import { Router } from "express";
import { login } from "../controllers/AuthController.js";
import passport from "passport";
import routesVersioning  from 'express-routes-versioning';
const routerLogin = Router();
const version = routesVersioning();

routerLogin.post(
  "/",
  passport.authenticate("local", { session: false }),
  version({
    "1.0.0": login
}));

export default routerLogin;
