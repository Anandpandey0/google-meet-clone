import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const getSocketInstance = (): Socket => {
  if (!socketInstance) {
    socketInstance = io("http://localhost:8080");
  }
  return socketInstance;
};
