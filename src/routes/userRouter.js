import { Router } from "express";
import  ControllerUser  from "../controllers/ControllerUser.js";
import passport from "passport";
import { limitPet } from "../config/limit.js";
import routesVersioning  from 'express-routes-versioning';

const version = routesVersioning();
const userRouter = Router();
userRouter
.use(limitPet())
.get("/", passport.authenticate("jwt", { session: false }), version({
    "1.0.0": ControllerUser.getUser}))

.post("/", version({
    "1.0.0": ControllerUser.setUser}))

.put("/", passport.authenticate("jwt", { session: false }), version({
    "1.0.0": ControllerUser.updateUser}))

.delete("/", passport.authenticate("jwt", { session: false }), version({
    "1.0.0": ControllerUser.deleteUser}));

export default userRouter;
