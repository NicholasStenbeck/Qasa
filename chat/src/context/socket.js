import { createContext } from 'react';
import socketio from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:3012";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();