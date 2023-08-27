import express from "express";
import dotenv from "dotenv";
import pedidoRouter from "./routes/pedidoRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use('/pedidos', pedidoRouter)

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
  console.log(`Server is running on http:${config.hostname}:${config.port}`);
});