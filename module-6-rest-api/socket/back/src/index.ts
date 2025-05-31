import './load-env.js';
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import url from 'url';
import { createApp } from './express.server.js';
import { envConstants } from './env.constants.js';
import { api } from './api.js';
import { addUserSession, ConnectionConfig, getUserInfo } from './store.js';
import { userInfo } from 'os';

const app = createApp();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  // IMPORTANT LIMIT HERE YOUR CLIENT APPS DOMAINS
  origin: '*',
  preflightContinue: false,
};

app.use(cors(options));

const socketapp = new http.Server(app);
const io = new Server(socketapp, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
app.use('/', express.static(staticFilesPath));

app.use('/api', api);

app.listen(envConstants.PORT, () => {
  console.log(`Server ready at http://localhost:${envConstants.PORT}/api`);
});

socketapp.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket: Socket) => {
  console.log('connection received');
  const config: ConnectionConfig = {
    nickname: socket.handshake.query['nickname'] as string,
    room: socket.handshake.query['room'] as string,
  };
  const isUserAdded = addUserSession(socket.id, config);
  if (isUserAdded) {
    socket.emit('message', { type: 'CONNECTION_SUCCEEDED' });
    socket.join(socket.handshake.query['room']);
    socket.on('message', (body: any) => {
      const userInfo = getUserInfo(socket.id);
      console.log(body);
      io.to(userInfo.room).emit('message', {
        // socket.broadcast.emit('message', {
        ...body,
        payload: {
          ...body.payload,
          nickname: getUserInfo(socket.id),
        },
      });
    });
  } else {
    socket.emit('message', { type: 'NICKNAME_USED' });
  }
});
