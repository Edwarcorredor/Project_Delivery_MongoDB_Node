import { request, response } from "express";
import RestauranteModel from "../models/ModelRestaurante.js";
import { restauranteSchema } from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";

class RestauranteCrll {
  static async getByCategory(req = request, res = response) {
    try {
      const { category } = req.query;
      if (!category) {
        return res
          .status(401)
          .json({ ok: false, msg: "category query is required" });
      }
      const restaurantsFilters = await RestauranteModel.getByCategory(category);
      res.status(200).json({ ok: true, restaurantes: restaurantsFilters });
    } catch (error) {
      console.log(
        "🚀 ~ file: RestauranteController.js:10 ~ RestauranteController ~ getAll ~ error:",
        error
      );
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async postRestaurante(req = request, res = response) {
    try {
      const validacion = restauranteSchema.safeParse(req.body);
      if (!validacion.success) {
        return res.status(400).json({
          message: validacion.error.errors.map(
            (error) => `${error.path} - ${error.message}`
          ),
        });
      }
      const transforRestaurante = funMapping(validacion.data, "restaurante");
      const { user } = req;
      const restaurante = {
        ...transforRestaurante,
        id_tendero: user.sub,
      };
      const insertRestaurante = await RestauranteModel.postRestaurante(
        restaurante
      );

      res.status(200).json({ ok: true, data: insertRestaurante, restaurante });
    } catch (error) {
      console.log(
        "🚀 ~ file: RestauranteController.js:33 ~ RestauranteCrll ~ postRestaurante ~ error:",
        error
      );
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async getRestaurantes(req = request, res = response) {
    try {
      const { sub } = req.user;
      const restaurantsFilters = await RestauranteModel.getByTendero(sub);
      res.status(200).json({ ok: true, restaurantes: restaurantsFilters });
    } catch (error) {
      console.log(
        "🚀 ~ file: RestauranteController.js:10 ~ RestauranteController ~ getAll ~ error:",
        error
      );
      res.status(500).json({ ok: false, msg: error });
    }
  }
}

export default RestauranteCrll;
