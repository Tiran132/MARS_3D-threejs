import { CustomObject3D, CustomObjectParams, GroupParams, ModelParams } from "./CustomObject3D";
import * as THREE from "three"
import { LoadModel, LoadModel_OBJ } from "./ModelLoader";
import { init, t_RoboHand } from "./tests";
import { a } from "./ObjectManager1";

export class ObjectIndexed {
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
const worldVector = new THREE.Vector3()


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

const create_model_OBJ = (model_name: string) => {

    const newObject = new CustomObject3D();
    newObject.setParams({
        object_type: "custom"
    })

    let obj_object: THREE.Group | undefined
    LoadModel_OBJ(model_name, (new_object) => {
        obj_object = new_object
        
        if (new_object) {
            new_object.children.map(child => {
                if(child instanceof THREE.Mesh)
                    child.material = newObject.getMesh().material
            })
            newObject.getMesh().add(obj_object)
        }
    });

    MainScene.add(newObject.getMesh())
    const newIndexedObject = new ObjectIndexed(objectsIndexed.length, newObject)
    objectsIndexed.push(newIndexedObject)

    return newIndexedObject.getId()
}

const create_model = (path: string) => {
    const newObject = new CustomObject3D();
    newObject.setParams({
        object_type: "custom"
    })

    let obj_object: THREE.Object3D | undefined
    LoadModel(path, (new_object) => {
        obj_object = new_object
        
        if (new_object) {
            // new_object.children.map(child => {
            //     if(child instanceof THREE.Mesh)
            //         child.material = newObject.getMesh().material
            // })
            newObject.getMesh().add(obj_object)
        }
    })

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

const group = (idParent: number, idChild: number) => {
    const parent = getObjectById(idParent)
    const child = getObjectById(idChild)

    if (parent && child){
        const worldPos = child.getObject().getMesh().position;
        const localePos = parent.getObject().getMesh().worldToLocal(worldPos);
        parent.getObject().getMesh().add(child.getObject().getMesh())
        child.getObject().getMesh().position.set(localePos.x, localePos.y, localePos.z);
    }
}


const rgroup = (idParent: number, idChild: number) => {
    const parent = getObjectById(idParent)
    const child = getObjectById(idChild)

    if (parent && child){
        const worldPos = child.getObject().getMesh().getWorldPosition(worldVector);
        MainScene.add(child.getObject().getMesh())
        child.getObject().getMesh().position.set(worldPos.x, worldPos.y, worldPos.z);
    }
}
create_model("models/model_with_light.json")

export { MainScene, objectsIndexed, getAllObjects, getObjectById, create, update, group, rgroup, create_model }

init()
a()