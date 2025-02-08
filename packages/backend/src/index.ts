import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { initRestApi } from "./rest";
import { initWebSockets } from "./websockets";
import { startScheduledTasks } from "./scheduler";

const PORT = process.env.PORT || 3000;

const app = express();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(app);

initRestApi(app);
initWebSockets(server);
startScheduledTasks();

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
