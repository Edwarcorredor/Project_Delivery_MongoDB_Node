import { conexion } from "../config/atlas.js";
import getNextSequenceValue from '../db/autoIncrement.js'
const db = await conexion();

class ModelCrud {
    static async getAll(collection){
        return await db.collection(collection).find().toArray();
    }

    static async setDocument(collection,datos){
        try{
            datos["_id"] = await getNextSequenceValue(db,collection);
            const result = await db.collection(collection).insertOne(datos);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }
    }

    static async updateDocument(collection,datos, ID){
        try{
            const filter = {_id: ID}
            const update = {$set: datos}
            const result = await db.collection(collection).updateOne(filter, update);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }
    }

    static async deleteDocument(collection,ID){
        try{
            const filter = {_id: ID}
            const result = await db.collection(collection).deleteOne(filter);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }  
    }
}


export default ModelCrud;