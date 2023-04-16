import { createObject, CustomObjectParams, GroupParams, ModelParams, setParamsToObject3D } from "./CustomObject3D";
import * as THREE from "three"
import { getAllObjectsWithName, LoadModel, LoadModel_OBJ, loadTexture } from "./ModelLoader";
import { init, sleep } from "./tests";
import { Color, Mesh, Scene } from "three";
import { initial } from "./Raycaster";

const MainScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45)
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight);
const worldVector = new THREE.Vector3()
MainScene.add(camera)

const init1 = async () => {
    await sleep(1000)
    camera.position.set(0, 10, 20)
    console.log(MainScene.getObjectByProperty("type", "PerspectiveCamera"))
}
init1()
// new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: new Color(0.5, 0.5, 0.5)})
// const object = new THREE.Mesh()
// setParamsToObject3D(object, {
//     object_type: "sphere",

// })
// console.log(createObject({
//     object_type: "cube",
//     // geometry: [1, 1, 1]
// }))



// const cameraObj = MainScene.parent.getObjectByProperty("type", "PerspectiveCamera");

export const a = () => ""

const getObjectById = (id: number) => {
    return MainScene.getObjectById(id)
}

const getObjectByName = (name: string) => {
    return MainScene.getObjectByName(name)
}

const getAllObjects = () => MainScene.children

/**
 * 
 * @returns id: number
 */
const create = (params: CustomObjectParams) => {
    const object = createObject(params)
    MainScene.add(object)
    return object.id
}

const create_model_OBJ = (model_name: string) => {
    let id: number | undefined
    LoadModel_OBJ(model_name, (new_object) => {
        if (new_object) {
            new_object.children.map(child => {
                if (child instanceof THREE.Mesh)
                    child.material = new THREE.MeshStandardMaterial({ color: new Color(0.5, 0.5, 0.5) })
            })

        }

        MainScene.add(new_object)
        id = new_object.id
    });
    return id
}

const create_model = async (path: string) => {
    let id: number | undefined
    let childrenWithName: {
        name: string;
        id: number;
    }[] = []
    await LoadModel(path, (new_object) => {
        MainScene.add(new_object)
        id = new_object.id;

        childrenWithName = getAllObjectsWithName(new_object.children)
        // const zveno2 = getObjectByName("zveno2_detal")
        // if( zveno2) update(zveno2.id, {
        //     color: [100, 50, 12],
        //     // rotation: [50, 0, 0]
        // })
    })
    return {
        id,
        children: childrenWithName
    }
}

const add_texture = (id: number, path: string) => {
    const obj = getObjectById(id)

    if (!obj) return;

    let temp = 0;
    loadTexture(path, (texture) => {
        if (obj instanceof Mesh) {
            if (obj.material instanceof THREE.MeshStandardMaterial){
                obj.material.map = texture;
                temp = 1;
            }
        }
    })

    return temp == 1;
}

/**
 *
 * @returns id: number
 */
const update = (id: number, params: CustomObjectParams) => {
    const object = getObjectById(id)

    if (object) {
        setParamsToObject3D(object, params)
    }

    return object?.id
}

const group = (idParent: number, idChild: number) => {
    const parent = getObjectById(idParent)
    const child = getObjectById(idChild)

    if (parent && child) {
        const worldPos = child.position;
        const localePos = parent.worldToLocal(worldPos);
        parent.add(child)
        child.position.set(localePos.x, localePos.y, localePos.z);
    }
}


const rgroup = (idParent: number, idChild: number) => {
    const parent = getObjectById(idParent)
    const child = getObjectById(idChild)

    if (parent && child) {
        const worldPos = child.getWorldPosition(worldVector);
        MainScene.add(child)
        child.position.set(worldPos.x, worldPos.y, worldPos.z);
    }
}
// const id1 = create_model("models/model_with_light.json")
// const torus = create({
//     object_type: "torus",
//     position: [1, 5, 0],
//     geometry: [1, 0.5, 1]
// })

// const ab = () => {
//     return id1.then((value) => {
//         console.log(value)
//     })
// }
// ab()

const obj1 = create({
    object_type: "cube",
    position: [2, 2, 2]
})
add_texture(obj1, "models/grass.jpg")


export { MainScene, camera as MainCamera, getAllObjects, getObjectById, create, update, group, rgroup, create_model, create_model_OBJ }

init()
initial()