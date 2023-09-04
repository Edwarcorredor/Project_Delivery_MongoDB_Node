import { conexion } from "../config/atlas.js";
import getNextSequenceValue from '../db/autoIncrement.js'
const db = await conexion();
const Product = db.collection("producto");
const Restaurante = db.collection("restaurante");

class ModelProducto {
    static async getProduct(id_restaurante){
        return await Product.find({restaurante: id_restaurante}).toArray();
    }

    static async setProduct(datos, id){
        try{   
            const consulta = await Restaurante.findOne({_id:datos.restaurante, id_tendero: id});
            if(!consulta){
                return {message: "El restaurante_producto no corresponde al Rappi tendero"}
            }
            const productInsert = await Product.insertOne({
                _id: await getNextSequenceValue(db, "producto"),
                ...datos
            });
            return productInsert
        }catch (error) {
            return error 
        }     
    }

    static async updateProduct(datos, id, id_producto){
        try{
            const consulta = await Restaurante.findOne({_id:datos.restaurante, id_tendero: id});
            const consulta2 = await Product.findOne({_id:id_producto, restaurante: datos.restaurante});
            if(!consulta || !consulta2){
                return { message: "El restaurante_producto no corresponde al Rappi tendero"}
            }
            const filter = {_id: id_producto}
            const update = {$set: datos}
            const result = await Product.updateOne(filter, update);
            return result;
        }catch(error){
            return error;
        }
    }

    static async deleteProduct(id_producto, id){
        try{
            const product = await Product.findOne({_id: id_producto});
    
            if (!product) {
                return {message: "No existe el producto"};
            }
            const restaurante = await Restaurante.findOne({
                _id: product.restaurante,
                id_tendero: id
            });
            if (!restaurante) {
                return {message:"El producto no corresponde a las tiendas del rappi tendero"};
            }
    
            const filter = { _id: id_producto };
            const result = await Product.deleteOne(filter);
    
            return result;
        } catch(error){
            return error;
        }
    }
    

}

export default ModelProducto