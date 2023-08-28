import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";

const pedidoRouter = Router();
pedidoRouter.use(passport.authenticate("jwt", { session: false }));

pedidoRouter
.get("/todos", checkRoles("cliente"), ControllerCrud.getAll)
.post("/uno/", ControllerCrud.setDocument)
.put("/update/:id", ControllerCrud.updateDocument)
.delete("/eliminar/:id", ControllerCrud.deleteDocument);

export default pedidoRouter;
