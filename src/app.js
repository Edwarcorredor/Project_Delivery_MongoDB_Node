import express from "express";
import dotenv from "dotenv";
import pedidoRouter from "./routes/pedidoRouter.js";
import clienteRouter from "./routes/clienteRouter.js";
import productoRouter from "./routes/productoRouter.js";
import repartidorRouter from "./routes/repartidorRouter.js";
import restauranteRouter from "./routes/restauranteRouter.js";
import loginRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js'
import morgan from 'morgan'
import "./utils/auth/index.js"

dotenv.config();
const app = express();
app
.use(express.json())
.use(morgan('dev'))
.use('/pedidos', pedidoRouter)
.use('/clientes', clienteRouter)
.use('/restaurantes', restauranteRouter)
.use('/productos', productoRouter)
.use('/repartidors', repartidorRouter)
.use('/login', loginRouter)
.use('/users', userRouter )

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
  console.log(`Server is running on http:${config.hostname}:${config.port}`);
});