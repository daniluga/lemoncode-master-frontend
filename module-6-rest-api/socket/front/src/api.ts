import { io, SocketOptions, Socket, ManagerOptions } from "socket.io-client";

// TODO: Add env variable
export const baseSocketUrl = "http://localhost:3000";

export const createSocket = (nickname: string, room: string): Socket => {
  const url = baseSocketUrl;

  const options: Partial<ManagerOptions & SocketOptions> = {
    timeout: 60000,
    query: {
      nickname: { nickname, room },
    },
  };

  return io(baseSocketUrl, options);
};
