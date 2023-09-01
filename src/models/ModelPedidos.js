import { conexion } from "../config/atlas.js";
const db = await conexion();
const Pedido = await db.collection("pedido");

class PedidoModel {
  static async getByUser(idUser) {
    const usersFound = await Pedido.find({ id_cliente: idUser }).toArray();
    return usersFound;
  }
}

export default PedidoModel;
