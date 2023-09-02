import { conexion } from "../config/atlas.js";
import getNextSequenceValue from '../db/autoIncrement.js'
import { hash } from "bcrypt";
const db = await conexion();
const User = db.collection("users");

class ModelUser {
    static async getUser(id){
        return await User.find({_id: id}).toArray();
    }

    static async setUser(datos){
        try{
            const checkEmail = await User.findOne({ email: datos.email });
            if (checkEmail) {
                return "Correo ya registrado"
            }
            const userInsert = await User.insertOne({
                _id: await getNextSequenceValue(db, "users"),
                ...datos,
                password: await hash(datos.password, 10),
            });
            return userInsert;
        }catch (error) {
            console.log("🚀 ~ file: user.controller.js:14 ~ userPost ~ error:", error);
            return error 
        }     
    }

    static async updateUser(datos, ID){
        try{

            const existingEmail = await User.findOne({ email: datos.email, _id: { $ne: ID } });
    
            if (existingEmail) {
                return "Correo ya registrado";
            }
    
            const filter = { _id: ID };
            datos.password = await hash(datos.password, 10);
            const update = { $set: datos };
            const result = await User.updateOne(filter, update);
    
            return result;
        } catch(error){
            return { status: 400, message: error.message };
        }
    }
    

    static async deleteUser(ID){
        try{
            const filter = {_id: ID}
            const result = await User.deleteOne(filter);
            return result;
        }catch(error){
            return {status: 400, message: error.message};
        }  
    }
}


export default ModelUser;