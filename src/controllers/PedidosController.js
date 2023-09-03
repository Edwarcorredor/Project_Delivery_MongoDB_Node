import { request, response } from "express";
import RestauranteModel from "../models/ModelRestaurante.js";
import funMapping from "../dto/transformDTO.js";
import PedidoModel from "../models/ModelPedidos.js";

class PedidosCrll {
  static async getByCliente(req = request, res = response) {
    try {
      const { sub } = req.user;
      const pedidosFiltered = await PedidoModel.getByUser(sub);
      res.status(200).json({ ok: true, pedidos: pedidosFiltered });
    } catch (error) {
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async postByCliente(req = request, res = response) {
    try {
      const { sub: idCliente } = req.user;
      const dataPedido = funMapping(req.body, "pedido");
      const pedidoInsert = await PedidoModel.postPedidoByCliente({
        id_cliente: idCliente,
        ...dataPedido,
      });

      res.status(200).json({ ok: true, pedidos: pedidoInsert });
    } catch (error) {
      console.log(
        "🚀 ~ file: RestauranteController.js:10 ~ RestauranteController ~ getAll ~ error:",
        error
      );
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async getAll(req = response, res = response) {
    try {
      const pedidosFound = await PedidoModel.getAllUserPedidos();
      res.status(200).json({ ok: true, pedidos: pedidosFound });
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  }

  static async updateByCliente(req = request, res = response) {
    try {
      const { id: idPedido } = req.params;
      const { sub } = req.user;
      const pedido = await PedidoModel.getByUserYPedido(sub, Number(idPedido));
      if (!pedido) {
        return res.status(401).json({
          ok: false,
          msg: "este pedido no pertenece a su usuario",
        });
      }
      const dataPedido = funMapping(req.body, "pedido");
      const pedidoUdpate = await PedidoModel.updatePedido(
        dataPedido,
        Number(idPedido)
      );
      res.status(200).json({ ok: true, pedidos: pedidoUdpate });
    } catch (error) {
      res.status(500).json({ ok: false, msg: error });
    }
  }
}

export default PedidosCrll;
