import { Router } from "express";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";
import routesVersioning  from 'express-routes-versioning';
import ControllerProductos from "../controllers/ControllerProductos.js";
import { limitPet } from "../config/limit.js";

const version = routesVersioning();
const productoRouter = Router();

productoRouter
.use(passport.authenticate("jwt", { session: false }))
.use(limitPet())
.get('/todos/:id', checkRoles("vendedor", "cliente"), version({
    "1.0.0": ControllerProductos.getProduct}))

.post('/', checkRoles("vendedor"), version({
    "1.0.0": ControllerProductos.setProducto}))

.put('/actualizar/:id', checkRoles("vendedor"), version({
    "1.0.0": ControllerProductos.updateProduct}))

.delete('/borrar/:id', checkRoles("vendedor"),  version({
    "1.0.0": ControllerProductos.deleteProduct}));
    
export default productoRouter;
