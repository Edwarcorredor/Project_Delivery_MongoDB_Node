import { request, response } from "express";
import RestauranteModel from "../models/ModelRestaurante.js";
import { restauranteSchema } from "../dto/modelDTO.js";
import funMapping from "../dto/transformDTO.js";

class RestauranteCrll {
  static async getByCategoryAll(req = request, res = response) {
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
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async postRestauranteByVendedor(req = request, res = response) {
    try {
      const transforRestaurante = funMapping(req.body, "restaurante");
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
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async getRestaurantesByVendedor(req = request, res = response) {
    try {
      const { sub } = req.user;
      const restaurantsFilters = await RestauranteModel.getByTendero(sub);
      res.status(200).json({ ok: true, restaurantes: restaurantsFilters });
    } catch (error) {
      res.status(500).json({ ok: false, msg: error });
    }
  }

  static async updateRestauranteByVendedor(req = request, res = response) {
    try {
      const restauranteTransfor = funMapping(req.body, "restaurante");
      const { sub: idTendero } = req.user;
      const { id: idRestaurante } = req.params;
      const checkRestaurante = await RestauranteModel.getBytenderoYTienda(
        idTendero,
        Number(idRestaurante)
      );

      if (!checkRestaurante) {
        return res.status(401).json({
          ok: false,
          msg: "su user no pertenece a restaurante",
        });
      }

      const restauranteUpdated = await RestauranteModel.updateRestaurante(
        Number(idRestaurante),
        idTendero,
        restauranteTransfor
      );

      return res
        .status(200)
        .json({ ok: true, restaurante_actualizado: restauranteUpdated });
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  }

  static async deleteRestauranteByVendedor(req = request, res = response) {
    try {
      const { sub: idTendero } = req.user;
      const { id: idRestaurante } = req.params;

      const checkRestaurante = await RestauranteModel.getBytenderoYTienda(
        idTendero,
        Number(idRestaurante)
      );

      if (!checkRestaurante) {
        return res.status(401).json({
          ok: false,
          msg: "no autorizado para eliminar este restaurante",
        });
      }

      const restauranteDelete = await RestauranteModel.deleteById(
        Number(idRestaurante)
      );
      res
        .status(200)
        .json({ ok: true, restaureante_delete: restauranteDelete });
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  }

  static async getTotalPedidosRestaurante(req = request, res = response) {
    try {
      const { sub: idTendero } = req.user;
      const { id: idTienda } = req.params;

      const checkRestaurante = await RestauranteModel.getBytenderoYTienda(
        idTendero,
        Number(idTienda)
      );

      if (!checkRestaurante) {
        return res
          .status(401)
          .json({ ok: false, msg: "restaurante no esta relacionado su user" });
      }
      const { pedidos, total } = await RestauranteModel.getTotalPedidos(
        Number(idTienda)
      );

      res.status(200).json({ ok: true, pedidos, total });
    } catch (error) {
      console.log(
        "🚀 ~ file: RestauranteController.js:130 ~ RestauranteCrll ~ getTotalPedidosRestaurante ~ error:",
        error
      );
      res.status(500).json({ ok: false, error });
    }
  }

  static async getProducts(req = request, res = response) {
    try {
      const { id: idRestaurante } = req.params;
      const products = await RestauranteModel.getProducts(
        Number(idRestaurante)
      );
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  }
}

export default RestauranteCrll;
