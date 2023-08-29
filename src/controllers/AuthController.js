import { request, response } from "express";
import { createToken } from "../utils/jwt.js";



export const login = async (req = request, res = response) => {
  try {
    const { user } = req;
    const token = await createToken({ sub: user._id, role: user.role });
    res.json({ ok: true, token, user });
  } catch (error) {
    console.log("🚀 ~ file: auth.controller.js:25 ~ login ~ error:", error);
    res.status(404).json(error);
  }
};
