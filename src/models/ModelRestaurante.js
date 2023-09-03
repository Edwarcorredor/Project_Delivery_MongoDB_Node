import { conexion } from "../config/atlas.js";
import getNextSequenceValue from "../db/autoIncrement.js";
const db = await conexion();
const Restaurante = await db.collection("restaurante");
const Pedido = await db.collection("pedido");
const Producto = await db.collection("producto");
class RestauranteModel {
  static async getByCategory(categoria) {
    const restaurantesFound = await Restaurante.find({ categoria }).toArray();
    return restaurantesFound;
  }

  static async postRestaurante(restaurante) {
    restaurante._id = await getNextSequenceValue(db, "restaurante");
    const insertRestaurante = await Restaurante.insertOne(restaurante);
    return insertRestaurante;
  }

  static async getByTendero(idTendero) {
    const restaurantesFound = await Restaurante.find({
      id_tendero: idTendero,
    }).toArray();
    return restaurantesFound;
  }

  static async getBytenderoYTienda(idTendero, idTienda) {
    const restauranteFound = await Restaurante.findOne({
      _id: idTienda,
      id_tendero: idTendero,
    });

    return restauranteFound;
  }

  static async updateRestaurante(idRestaurante, idTendero, dataRestaurante) {
    const restauranteUpdate = await Restaurante.updateOne(
      {
        _id: idRestaurante,
        id_tendero: idTendero,
      },
      { $set: { ...dataRestaurante, id_tendero: idTendero } }
    );
    return restauranteUpdate;
  }

  static async deleteById(idRestaurante) {
    return Restaurante.deleteOne({ _id: idRestaurante });
  }

  static async getTotalPedidos(idRestaurante) {
    const pedidosPromise = Restaurante.aggregate([
      {
        $match: {
          _id: idRestaurante,
        },
      },
      {
        $lookup: {
          from: "pedido",
          localField: "_id",
          foreignField: "id_restaurante",
          as: "pedidos",
        },
      },
      {
        $project: {
          restaurante: 0,
        },
      },
    ]).toArray();

    const totalPromise = Pedido.aggregate([
      {
        $match: {
          id_restaurante: idRestaurante,
        },
      },
      {
        $group: {
          _id: "total",
          total_vendido: { $sum: "$total" },
        },
      },
    ]).toArray();

    const [pedidos, total] = await Promise.all([pedidosPromise, totalPromise]);
    return { pedidos, total };
  }

  static async getProducts(idRestaurante) {
    const pedidos = await Producto.find({
      restaurante: idRestaurante,
    }).toArray();
    return pedidos;
  }
}

export default RestauranteModel;
