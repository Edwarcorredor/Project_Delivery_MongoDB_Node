import { conexion } from "../config/atlas.js";
const db = await conexion();
const User = await db.collection("users");

class UsuarioModel {
  static async getById(idUser) {
    const usersFound = await User.findOne({ _id: idUser });
    return usersFound;
  }
}

export default UsuarioModel;
