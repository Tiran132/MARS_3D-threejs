// @ts-nocheck-
// const net = require('net');
import * as net from "net";


export const init = () => {
    // try {
        var client = new net.Socket();
        client.connect(5000, '127.0.0.1', function() {
            console.log('Connected');
            client.write('Hello, server! Love, Client.');
        });
    
        client.on('data', function(data: any) {
            console.log('Received: ' + data);
            client.destroy(); // kill client after server's response
        });
    
        client.on('close', function() {
            console.log('Connection closed');
        });
    // }
    // catch (err) {
    //     if (err instanceof Error)
    //         console.log(`${err.name} - ${err.message}`)
    // }
}

