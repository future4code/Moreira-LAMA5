import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { concertRouter } from "./routes/concertRouter";
import { bandRouter } from "./routes/bandRouter";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/band", bandRouter)
app.use("/user", userRouter);
app.use("/concert", concertRouter)

const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });