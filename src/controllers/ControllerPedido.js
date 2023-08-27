import ModelPedido from "../models/ModelPedido.js";
import { pedidoSchema } from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";

class ControllerPedido{
    static async getAll(req,res){
        res.json(await ModelPedido.getAll());
    }

    static async setPedido(req, res){
        const validacion = pedidoSchema.safeParse(req.body);
        if (!validacion.success) return res.status(400).json({ message: validacion.error.errors.map(error => `${error.path} - ${error.message}`)});
        const result = await ModelPedido.setPedido(funMapping(validacion.data, 4));
        if (result.status) return res.status(result.status).json({ message: result.message});
        res.json(result);
    }

    static async updatePedido(req, res){
        const validacion = pedidoSchema.safeParse(req.body);
        if (!validacion.success) return res.status(400).json({ message: validacion.error.errors.map(error => `${error.path} - ${error.message}`)});
        const result = await ModelPedido.updatePedido(funMapping(validacion.data, 4), parseInt(req.params.id));
        if (result.status) return res.status(result.status).json({ message: result.message});
        res.json(result);
    }

    static async deletePedido(req, res){
        const result = await ModelPedido.deletePedido(parseInt(req.params.id));
        if (result.status) return res.status(result.status).json({ message: result.message});
        res.json(result);
    }
}

export default ControllerPedido;