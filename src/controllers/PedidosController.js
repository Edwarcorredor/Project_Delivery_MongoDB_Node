import { request, response } from "express";
import RestauranteModel from "../models/ModelRestaurante.js";
import { pedidoSchema } from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";
import PedidoModel from "../models/ModelPedidos.js";

class PedidosCrll {
  static async get(req = request, res = response) {
    try {
      const { sub } = req.user;
      const pedidosFiltered = PedidoModel.getByUser(sub);
      res.status(200).json({ ok: true, pedidos: pedidosFiltered });
    } catch (error) {
      console.log(
        "🚀 ~ file: RestauranteController.js:10 ~ RestauranteController ~ getAll ~ error:",
        error
      );
      res.status(500).json({ ok: false, msg: error });
    }
  }
}

export default PedidosCrll;
