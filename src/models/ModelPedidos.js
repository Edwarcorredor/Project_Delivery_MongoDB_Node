import { conexion } from "../config/atlas.js";
import getNextSequenceValue from "../db/autoIncrement.js";
const db = await conexion();
const Pedido = await db.collection("pedido");
const User = await db.collection("users");

class PedidoModel {
  static async getByUser(idUser) {
    const usersFound = await Pedido.find({ id_cliente: idUser }).toArray();
    return usersFound;
  }

  static async postPedidoByCliente(dataPedido) {
    const pedidoInsert = Pedido.insertOne({
      _id: await getNextSequenceValue(db, "pedido"),
      ...dataPedido,
    });
    return pedidoInsert;
  }

  static async updatePedido(dataPedido, idPedido) {
    const pedidoUpdated = await Pedido.updateOne(
      { _id: idPedido },
      { $set: dataPedido }
    );
    return pedidoUpdated;
  }

  static async getByUserYPedido(idUser, idPedido) {
    const usersFound = await Pedido.findOne({
      id_cliente: idUser,
      _id: idPedido,
    });
    return usersFound;
  }

  static async getAllUserPedidos() {
    const userPedidosFound = await User.aggregate([
      {
        $lookup: {
          from: "pedido",
          localField: "_id",
          foreignField: "id_cliente",
          as: "pedidos",
        },
      },
      {
        $match: {
          pedidos: { $exists: true, $ne: [] },
        },
      },
      {
        $project: {
          pedidos: 1,
          coordinates: 1,
          username: 1,
          telefono: 1,
        },
      },
    ]).toArray();

    

    return userPedidosFound;
  }

}

export default PedidoModel;
