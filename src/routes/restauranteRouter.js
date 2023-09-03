import { Router } from "express";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";
import RestauranteCrll from "../controllers/RestauranteController.js";
import routesVersioning from "express-routes-versioning";
import { validateShemas } from "../middlewares/validateShemas.middlware.js";
import { restauranteSchema } from "../dto/modelDTO.js";
const version = routesVersioning();
const restauranteRouter = Router();

restauranteRouter
  .use(passport.authenticate("jwt", { session: false }))

  .get(
    "/mis_restaurantes",
    checkRoles("vendedor"),
    version({
      "1.0.0": RestauranteCrll.getRestaurantesByVendedor,
    })
  )

  .get(
    "/mis_restaurantes/:id/total_pedidos",
    checkRoles("vendedor"),
    version({
      "1.0.0": RestauranteCrll.getTotalPedidosRestaurante,
    })
  )

  .get(
    "/:id/productos",
    checkRoles("vendedor", "cliente", "repartidor"),
    version({
      "1.0.0": RestauranteCrll.getProducts,
    })
  )

  .get(
    "/categorias",
    checkRoles("cliente", "vendedor"),
    version({
      "1.0.0": RestauranteCrll.getByCategoryAll,
    })
  )

  .post(
    "/uno",
    checkRoles("vendedor"),
    validateShemas(restauranteSchema),
    version({
      "1.0.0": RestauranteCrll.postRestauranteByVendedor,
    })
  )

  .put(
    "/update/:id",
    checkRoles("vendedor"),
    validateShemas(restauranteSchema),
    version({
      "1.0.0": RestauranteCrll.updateRestauranteByVendedor,
    })
  )

  .delete(
    "/eliminar/:id",
    checkRoles("vendedor"),
    version({
      "1.0.0": RestauranteCrll.deleteRestauranteByVendedor,
    })
  );

export default restauranteRouter;
