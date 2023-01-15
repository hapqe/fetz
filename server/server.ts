import express from 'express';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';
import FingerPrint from 'express-fingerprint';
import Game from './game';
import * as http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 8000;

app.use(FingerPrint());

const gameTarget = 'http://127.0.0.1:5174/'
const playerTarget = 'http://127.0.0.1:5173/'

const games: Map<string, Game> = new Map();

app.get('/new', (req, res) => {
  games.clear();

  let h = req.fingerprint!.hash;
  h = h.substring(0, 4);
  if (!games.has(h)) {
    games.set(h, new Game(h));
  }

  res.send({ room: h })
});

app.post('/join/:room', (req, res) => {
    const r = req.params.room;
    
    if (games.has(r)) {
      const id = games.get(r)!.join(req.fingerprint!.hash.substring(0, 4));
      res.send({ id });
    }

    res.send({ id: -2 });
});

app.post('/pos/:room', (req, res) => {
    const r = req.params.room;
    
    if (games.has(r)) {
      console.log(req.body);
    }

    res.send();
});

app.use('/r/:room', proxy({ target: playerTarget, changeOrigin: true }));
app.use('/', proxy({ target: gameTarget, changeOrigin: true }));

server.listen(port);

io.on('connection', (s) => {
  console.log('a user connected');
})