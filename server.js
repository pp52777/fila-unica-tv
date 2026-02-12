const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log("Serveur WebSocket démarré sur ws://localhost:8080");

wss.on('connection', function connection(ws) {
  console.log("Nouvelle connexion");

  ws.on('message', function incoming(message) {
    console.log('Reçu:', message);

    // On renvoie le message à tous les clients connectés (broadcast)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
