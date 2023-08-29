import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";

const pedidoRouter = Router();


pedidoRouter
.use(passport.authenticate("jwt", { session: false }))
.get("/todos", checkRoles("cliente"), ControllerCrud.getAll)
.post("/uno/", checkRoles("cliente"), ControllerCrud.setDocument)
.put("/update/:id",checkRoles("cliente") ,ControllerCrud.updateDocument)
.delete("/eliminar/:id", checkRoles("cliente")  , ControllerCrud.deleteDocument);

export default pedidoRouter;
