import { request, response } from "express";

export const checkRoles = (...roles) => {
  return (req = request, res = response, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `su rol: ${role}, el servicio requiere uno de estos roles: ${roles.join(
          ", "
        )}`,
      });
    }
    next();
  };
};
