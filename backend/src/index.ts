import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { initRestApi } from "./rest";
import { initWebSockets } from "./websockets";

const PORT = process.env.PORT || 3000;

const app = express();

const server = createServer(app);

initRestApi(app);
initWebSockets(server);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
