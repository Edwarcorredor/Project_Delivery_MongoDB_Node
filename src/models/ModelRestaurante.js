import { conexion } from "../config/atlas.js";
import getNextSequenceValue from "../db/autoIncrement.js";
const db = await conexion();
const Restaurante = await db.collection("restaurante");

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
    const restaurantes = await Restaurante.find({ id_tendero: idTendero }).toArray();
    return restaurantes
  }
}

export default RestauranteModel;
