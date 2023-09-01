import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import { checkRoles } from "../middlewares/auth.middleware.js";
import passport from "passport";
import routesVersioning  from 'express-routes-versioning';

const version = routesVersioning();
const clienteRouter = Router();
clienteRouter
.use(passport.authenticate("jwt", { session: false }))
.get('/todos',checkRoles("user", "admin")  ,ControllerCrud.getAll)
.get('/todos',checkRoles("user", "admin")  ,ControllerCrud.getAll)
.post('/uno/',checkRoles("user", "admin") ,ControllerCrud.setDocument)
.put('/update/:id', checkRoles("cliente", "admin"),ControllerCrud.updateDocument)
.delete('/eliminar/:id', checkRoles("admin"), ControllerCrud.deleteDocument);

export default clienteRouter;