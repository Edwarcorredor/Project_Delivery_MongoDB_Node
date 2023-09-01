import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import { checkRoles } from "../middlewares/auth.middleware.js";
import passport from "passport";
import routesVersioning  from 'express-routes-versioning';

const version = routesVersioning();
const repartidorRouter = Router();

repartidorRouter
  .use(passport.authenticate("jwt", { session: false }))
  .get(
    "/todos",
    checkRoles("user", "cliente", "vendedor"),
    ControllerCrud.getAll
  )
  .post("/uno/", checkRoles("repartidor", "user"), ControllerCrud.setDocument)
  .put("/update/:id", ControllerCrud.updateDocument)
  .delete(
    "/eliminar/:id",
    checkRoles("repartidor", "admin"),
    ControllerCrud.deleteDocument
  );

export default repartidorRouter;
