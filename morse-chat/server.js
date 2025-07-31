const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const helmet = require("helmet");
const { toMorse, fromMorse } = require('./morse');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(helmet());
app.use(express.static('public'));

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const clean = message.toString().replace(/[^.-/ ]/g, '').slice(0, 1024);
    for (let client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(clean);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
