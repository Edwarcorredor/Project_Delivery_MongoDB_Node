import { request, response } from "express";
import { hash } from "bcrypt";
import { conexion } from "../config/atlas.js";
import { userShema } from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";
import getNextSequenceValue from "../db/autoIncrement.js";
const db = await conexion();
const User = db.collection("users");


export const userPost = async (req = request, res = response) => {
  try {
    const validacion = userShema.safeParse(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        message: validacion.error.errors.map(
          (error) => `${error.path} - ${error.message}`
        ),
      });
    }
    const transforUser = funMapping(validacion.data, "user");
    const checkEmail = await User.findOne({email: transforUser.email})
    if(checkEmail){
        return res.status(401).json({ msg: "correo ya registrado"});
    }

    const userInsert = await User.insertOne({
      _id: await getNextSequenceValue(db, "user"),
      ...transforUser,
      password: await hash(transforUser.password, 10),
    });

    res.status(200).json({ ok: true, insert: userInsert });
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:14 ~ userPost ~ error:", error);
    res.status(500).json({ ok: false, msg: error });
  }
};
