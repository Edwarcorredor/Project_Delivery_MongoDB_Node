import { Router } from "express";
import ControllerCrud from "../controllers/ControllerUser.js";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.middleware.js";
import PedidosCrll from "../controllers/PedidosController.js";
import routesVersioning from "express-routes-versioning";
import { validateShemas } from "../middlewares/validateShemas.middlware.js";
import { pedidoSchema } from "../dto/modelDTO.js";

const version = routesVersioning();

const pedidoRouter = Router();

pedidoRouter
  .use(passport.authenticate("jwt", { session: false }))
  .get(
    "/",
    checkRoles("cliente"),
    version({
      "1.0.0": PedidosCrll.getByCliente,
    })
  )

  .get(
    "/todos",
    checkRoles("repartidor"),
    version({
      "1.0.0": PedidosCrll.getAll,
    })
  )

  .post(
    "/uno",
    checkRoles("cliente", "vendedor"),
    validateShemas(pedidoSchema),
    version({
      "1.0.0": PedidosCrll.postByCliente,
    })
  )

  .put(
    "/update/:id",
    checkRoles("cliente"),
    validateShemas(pedidoSchema),
    version({
      "1.0.0": PedidosCrll.updateByCliente,
    })
  );

export default pedidoRouter;
