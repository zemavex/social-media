import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";

export function initWebSockets(server: Server): void {
  const io = new SocketIOServer(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", (msg) => {
      console.log("message " + msg);
      socket.broadcast.emit("chat message", msg);
    });
  });
}
