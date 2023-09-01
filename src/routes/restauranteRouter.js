import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import { checkRoles } from "../middlewares/auth.middleware.js";
import passport from "passport";
import RestauranteCrll from "../controllers/RestauranteController.js";
import routesVersioning  from 'express-routes-versioning';

const version = routesVersioning();

const restauranteRouter = Router();

restauranteRouter
  .use(passport.authenticate("jwt", { session: false }))
  .get("/", checkRoles("vendedor", "cliente"), RestauranteCrll.getByCategory)
  .get(
    "/todos",
    checkRoles("vendedor", "cliente"),
    RestauranteCrll.getRestaurantes
  )
  .post("/uno/", checkRoles("vendedor"), RestauranteCrll.postRestaurante)
  .put("/update/:id", checkRoles("vendedor"), ControllerCrud.updateDocument)
  .delete(
    "/eliminar/:id",
    checkRoles("vendedor"),
    ControllerCrud.deleteDocument
  );

export default restauranteRouter;
