import { CustomObjectParams, GroupParams, ModelParams } from "./threejs/CustomObject3D";
import { create, create_model, create_model_OBJ, group, rgroup, update } from "./threejs/ObjectManager";


interface Command {
    name: "create" | "update" | "group" | "r_group" | "create_model" | "create_model_obj"
    data: { id?: number } & CustomObjectParams & GroupParams & ModelParams
}

let MainWS: WebSocket | undefined

const createWebSocket = (port = 5001) => {
    MainWS?.close();

    MainWS = new WebSocket(`ws://localhost:${port}/`);
    MainWS.onopen = () => {
        console.log("Opened session");
    };


    MainWS.onmessage = async (ev) => {
        try {
            const command: Command = JSON.parse(ev.data)
            MainWS?.send(JSON.stringify({
                name: command.name,
                id: await handleCommand(command)
            }))
        } catch {
            return
        }
    };

    return MainWS
}

const handleCommand = async (command: Command) => {
    switch (command.name) {
        case "create":
            return create(command.data);
        case "update":
            if (command.data.id != undefined)
                return update(command.data.id, command.data);
            throw "Id required, but not provided"
        case "group":
            if (command.data.id != undefined && command.data.object_id != undefined)
                return group(command.data.id, command.data.object_id);
            throw "Ids required, but not provided"
        case "r_group":
            if (command.data.id != undefined && command.data.object_id != undefined)
                return rgroup(command.data.id, command.data.object_id);
            throw "Ids required, but not provided"
        
        case "create_model":
            if (command.data.path != undefined)
                return create_model(command.data.path);
            break

        case "create_model_obj":
            if (command.data.path != undefined)
                return create_model_OBJ(command.data.path);
            break            
    }
}


export { createWebSocket }