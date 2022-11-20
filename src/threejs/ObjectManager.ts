import { CustomObject3D, CustomObjectParams } from "./CustomObject3D";
import * as THREE from "three"

class ObjectIndexed {
    id: number;
    object: CustomObject3D;

    constructor(_id: number, object: CustomObject3D) {
        this.id = _id;
        this.object = object;
    }

    public getId() {
        return this.id;
    }

    public getObject() {
        return this.object
    }
}
let objectsIndexed: ObjectIndexed[] = []

const MainScene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);


const getObjectById = (id: number) => {
    return objectsIndexed.find(object => object.getId() == id)
}

const getAllObjects = () => objectsIndexed.map(object => object.getObject());

/**
 * 
 * @returns id: number
 */
const create = (params: CustomObjectParams) => {
    const newObject = new CustomObject3D();
    newObject.setParams(params)
    MainScene.add(newObject.getMesh())
    const newIndexedObject = new ObjectIndexed(objectsIndexed.length, newObject)
    objectsIndexed.push(newIndexedObject)

    return newIndexedObject.getId()
}


/**
 * 
 * @returns id: number
 */
const update = (id: number, params: CustomObjectParams) => {
    const object = getObjectById(id)

    if (object) {
        object.getObject().setParams(params)
    }


    return object?.getId()
}

const createSceneAttributes = () => {
    MainScene.add()
}

export { MainScene, objectsIndexed, getAllObjects, getObjectById, create, update }




const test = () => {

    create({
        object_type: "cylinder",
        position: [1, 2, 0]
    })


    const objectId = create({
        position: [1, 2, 0]
    })

    console.log("created object with id:", objectId)


    setTimeout(() => {
        update(objectId, {
            color: [10, 60, 100],
            scale: [1.2, 1.2, 1.2],
            position: [1, 0, 0]
        })
    }, 2000);

}

// test();

interface Command {
    name: "create" | "update"
    data: { id?: number } & CustomObjectParams
}

const commandEndpoint = (commandJSON: string) => {
    const command: Command = JSON.parse(commandJSON)
    return {
        name: command.name,
        id: handleCommand(command)
    }
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


commandEndpoint(`
{
    "name":"create",
    "data":{
       "position":[0, 0, 0]
    }
 }
`)

const result = commandEndpoint(`
{
    "name":"update",
    "data":{
        "id": 0,
       "color": [10, 100, 50]
    }
 }
`)
console.log(result)