import { CustomObjectParams } from "./threejs/CustomObject3D";
import { create, update } from "./threejs/ObjectManager";


interface Command {
    name: "create" | "update"
    data: { id?: number } & CustomObjectParams
}

let MainWS: WebSocket | undefined

const createWebSocket = (port = 5001) => {
    MainWS?.close();

    MainWS = new WebSocket(`ws://localhost:${port}/`);
    MainWS.onopen = () => {
        console.log("Opened session");
    };


    MainWS.onmessage = (ev) => {
        try {
            const command: Command = JSON.parse(ev.data)
            MainWS?.send(JSON.stringify({
                name: command.name,
                id: handleCommand(command)
            }))
        } catch {
            return
        }
    };

    return MainWS
}

const handleCommand = (command: Command) => {
    switch (command.name) {
        case "create":
            return create(command.data);
        case "update":
            if (command.data.id != undefined)
                return update(command.data.id, command.data);
            throw "Id required, but not provided"
    }
}


export { createWebSocket }