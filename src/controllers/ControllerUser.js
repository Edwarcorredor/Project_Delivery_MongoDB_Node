import ModelUser from "../models/ModelUser.js";
import {userShema} from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";


class ControllerUser {
  static async getUser(req, res) {
    const {sub} = req.user
    res.json(await ModelUser.getUser(sub));
  }

  static async setUser(req, res) {
    const validacion = userShema.safeParse(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        message: validacion.error.errors.map(
          (error) => `${error.path} - ${error.message}`
        ),
      });
    }
    const transforUser = funMapping(validacion.data, "user");
    const result = await ModelUser.setUser(transforUser);
    if (!result.status){
      return res.status(result.status).json({ message: result.message });
    } 
    res.json(result);
  }

  static async updateUser(req, res) {
    const {sub} = req.user
    const validacion = userShema.safeParse(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        message: validacion.error.errors.map(
          (error) => `${error.path} - ${error.message}`
        ),
      });
    }
    const transforUser = funMapping(validacion.data, sub);
    const result = await ModelUser.updateUser(transforUser, req);
    if (!result.status){
      return res.status(result.status).json({ message: result.message });
    }
    res.json(result);
  }

  static async deleteUser(req, res) {
    const {sub} = req.user
    const result = await ModelUser.deleteUser(sub);
    if (result.status)
      return res.status(result.status).json({ message: result.message });
    res.json(result);
  }
}

export default ControllerUser;
