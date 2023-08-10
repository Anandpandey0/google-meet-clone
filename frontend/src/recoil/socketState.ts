import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const getSocketInstance = (): Socket => {
  if (!socketInstance) {
    socketInstance = io("localhost:8000");
  }
  return socketInstance;
};
