import { Router } from "express";
import ControllerPedido from "../controllers/ControllerPedido.js";

const pedidoRouter = Router();

pedidoRouter
            
.get('/todos', ControllerPedido.getAll)
.post('/uno/', ControllerPedido.setPedido)
.put('/update/:id', ControllerPedido.updatePedido)
.delete('/eliminar/:id', ControllerPedido.deletePedido);

export default pedidoRouter;