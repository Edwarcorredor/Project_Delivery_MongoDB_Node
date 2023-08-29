import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";

const productoRouter = Router();
productoRouter
  .use(passport.authenticate("jwt", { session: false }))
  .get("/todos", checkRoles("cliente", "vendedor"), ControllerCrud.getAll)
  .post("/uno/", checkRoles("vendedor"), ControllerCrud.setDocument)
  .put("/update/:id", checkRoles("vendedor"), ControllerCrud.updateDocument)
  .delete(
    "/eliminar/:id",
    checkRoles("vendedor"),
    ControllerCrud.deleteDocument
  );

export default productoRouter;
