import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";
import PedidosCrll from "../controllers/PedidosController.js";
import routesVersioning  from 'express-routes-versioning';

const version = routesVersioning();

const pedidoRouter = Router();

pedidoRouter
.use(passport.authenticate("jwt", { session: false }))
.get("/uno", checkRoles("cliente"), PedidosCrll.get)
.get("/todos",checkRoles("repartidor"), version({
    "1.0.0": ControllerCrud.getAll
}))
.post("/uno/", checkRoles("cliente"), version({
    "1.0.0": ControllerCrud.setDocument
})) 
.put("/update/:id",checkRoles("cliente") , version({
    "1.0.0": ControllerCrud.updateDocument
})) 
.delete("/eliminar/:id", checkRoles("cliente")  , version({
    "1.0.0": ControllerCrud.deleteDocument
}))

export default pedidoRouter;
