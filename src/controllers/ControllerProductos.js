import ModelProducto from "../models/ModelProductos.js";
import {productoSchema} from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";

class ControllerProductos{
    static async getProduct(req, res) {
        const id_restaurante = parseInt(req.params.id);
        res.send(await ModelProducto.getProduct(id_restaurante));
    }

    static async setProducto(req, res) {
        const validacion = productoSchema.safeParse(req.body);
        const {sub} = req.user
        if (!validacion.success) {
          return res.status(400).json({
            message: validacion.error.errors.map(
              (error) => `${error.path} - ${error.message}`
            ),
          });
        }
        const transforProduct = funMapping(validacion.data, "producto");
        const result = await ModelProducto.setProduct(transforProduct, sub);
        res.json(result);
    }

    static async updateProduct(req, res) {
        const {sub} = req.user
        const validacion = productoSchema.safeParse(req.body);
        if (!validacion.success) {
            return res.status(400).json({
            message: validacion.error.errors.map(
                (error) => `${error.path} - ${error.message}`
            ),
            });
        }
        const transforProduct = funMapping(validacion.data, "producto");
        const result = await ModelProducto.updateProduct(transforProduct, sub, parseInt(req.params.id));
        res.status(200).json(result);
    } 

    static async deleteProduct(req, res) {
        const {sub} = req.user
        const result = await ModelProducto.deleteProduct(parseInt(req.params.id), sub);
        res.json(result);
    }
}

export default ControllerProductos