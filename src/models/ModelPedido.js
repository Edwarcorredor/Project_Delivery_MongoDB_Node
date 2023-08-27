import { conexion } from "../config/atlas.js";
import getNextSequenceValue from '../db/autoIncrement.js'
const db = await conexion();

class ModelPedido {
    static async getAll(){
        return await db.collection("pedido").find().toArray();
    }

    static async setPedido(pedido){
        try{
            pedido["_id"] = await getNextSequenceValue(db,"pedido");
            const result = await db.collection("pedido").insertOne(pedido);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }
    }

    static async updatePedido(pedido, ID){
        try{
            const filter = {_id: ID}
            const update = {$set: pedido}
            const result = await db.collection("pedido").updateOne(filter, update);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }
    }

    static async deletePedido(ID){
        try{
            const filter = {_id: ID}
            const result = await db.collection("pedido").deleteOne(filter);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }  
    }
}


export default ModelPedido;