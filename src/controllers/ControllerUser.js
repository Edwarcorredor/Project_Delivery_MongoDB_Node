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

  static async updateDocument(req, res) {
    const validacion = schemas[req.baseUrl.slice(1, -1)].safeParse(req.body);
    if (!validacion.success)
      return res
        .status(400)
        .json({
          message: validacion.error.errors.map(
            (error) => `${error.path} - ${error.message}`
          ),
        });

    const result = await ModelCrud.updateDocument(
      req.baseUrl.slice(1, -1), // colecion
      funMapping(validacion.data, req.baseUrl.slice(1, -1)), // data
      parseInt(req.params.id)  // param id
    );

    if (result.status)
      return res.status(result.status).json({ message: result.message });
    res.json(result);
  }

  static async deleteDocument(req, res) {
    const result = await ModelCrud.deleteDocument(
      req.baseUrl.slice(1, -1),
      parseInt(req.params.id)
    );
    if (result.status)
      return res.status(result.status).json({ message: result.message });
    res.json(result);
  }
}

export default ControllerUser;
