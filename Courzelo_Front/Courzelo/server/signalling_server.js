const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8082 }, () => {
    console.log("Signalling server is now listening on port 8082");
});

wss.broadcast = (ws, data) => {
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', ws => {
    console.log(`Client connected. Total connected clients: ${wss.clients.size}`);
    ws.on("message", function message(data, isBinary) {
        const message = isBinary ? data : data.toString();
        // Continue as before.
        console.log(message + "\n\n");
        wss.broadcast(ws, message);
      });
    /*ws.on('message', message => {
        // msg = JSON.parse(message);
        console.log(message + "\n\n");
        wss.broadcast(ws, message);
    });*/
    ws.on('close', ws=> {
        console.log(`Client disconnected. Total connected clients: ${wss.clients.size}`);
    })

    ws.on('error', error => {
        console.log(`Client error. Total connected clients: ${wss.clients.size}`);
    });
});