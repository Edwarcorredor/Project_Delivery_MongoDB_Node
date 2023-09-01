import ModelCrud from "../models/ModelCrud.js";
import {
  repartidorSchema,
  restauranteSchema,
  productoSchema,
  clienteSchema,
  pedidoSchema,
} from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";

const schemas = {
  repartidor: repartidorSchema,
  restaurante: restauranteSchema,
  producto: productoSchema,
  cliente: clienteSchema,
  pedido: pedidoSchema,
};

class ControllerCrud {
  static async getAll(req, res) {
    res.json(await ModelCrud.getAll(req.baseUrl.slice(1, -1)));
  }

  static async setDocument(req, res) {
    const validacion = schemas[req.baseUrl.slice(1, -1)].safeParse(req.body);
    if (!validacion.success)
      return res
        .status(400)
        .json({
          message: validacion.error.errors.map(
            (error) => `${error.path} - ${error.message}`
          ),
        });
    const result = await ModelCrud.setDocument(
      req.baseUrl.slice(1, -1),
      funMapping(validacion.data, req.baseUrl.slice(1, -1))
    );
    if (result.status)
      return res.status(result.status).json({ message: result.message });
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

export default ControllerCrud;
