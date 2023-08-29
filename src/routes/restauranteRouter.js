import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import { checkRoles } from "../middlewares/auth.middleware.js";
import passport from "passport";

const restauranteRouter = Router();

restauranteRouter
.use(passport.authenticate("jwt", { session: false }))
.get('/todos', checkRoles("vendedor", "cliente"),ControllerCrud.getAll)
.post('/uno/', checkRoles("vendedor"), ControllerCrud.setDocument)
.put('/update/:id', checkRoles("vendedor"),ControllerCrud.updateDocument)
.delete('/eliminar/:id', checkRoles("vendedor"), ControllerCrud.deleteDocument);

export default restauranteRouter;