import { Router } from "express";
import ControllerCrud from "../controllers/ControllerCrud.js";

const pedidoRouter = Router();

pedidoRouter
            
.get('/todos', ControllerCrud.getAll)
.post('/uno/', ControllerCrud.setDocument)
.put('/update/:id', ControllerCrud.updateDocument)
.delete('/eliminar/:id', ControllerCrud.deleteDocument);

export default pedidoRouter;