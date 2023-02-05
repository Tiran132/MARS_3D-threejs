import { Vector3, Euler, Color, BufferGeometry, MeshStandardMaterial, Mesh, Material } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { ObjectType, CommandVector3 } from '../types/types';
import { CustomObjectParams } from './CustomObject3D';
import { MainScene } from "./ObjectManager";
import * as THREE from "three"
import { sleep } from './tests';

const loader = new OBJLoader();
const loaderJSON = new THREE.ObjectLoader();
loader.setPath("/models/robot/");

export const LoadModel_OBJ = (name: string, onLoad: (group: THREE.Group) => void) => {
    loader.load(name, onLoad)
}

export const LoadModel = async (path: string, onLoad: (group: THREE.Object3D) => void) => {
    return new Promise((resolve, reject) => {
        loaderJSON.load(
            path,
            (obj) => {
                removeLightFromChildren(obj.children)
                resolve(onLoad(obj))
            }
        )
      });
}

const removeLightFromChildren = (children: THREE.Object3D[]) => {
    return children.reduce(
        (totalValue: number, obj: THREE.Object3D): number => {
            // Add the current object's value
            if (obj instanceof THREE.Light) {
                totalValue++;
                obj.parent?.remove(obj)
            }
            else if (obj.children) {
              totalValue += removeLightFromChildren(obj.children);
            }

            return totalValue;
          },
          0,
    )
}

const defaultNames = ["", "Group", "Box", "Capsule", "Circle", "Cylinder", "Dodecahedron", "Icosahedron", "Lathe", "Octahedron", "Plane", "Ring", "Sphere", "Sprite", "Tetrahedron", "Torus", "TorusKnot", "Tube", "AmbientLight", "DirectionalLight", "HemisphereLight", "PointLight", "SpotLight", "OrthographicCamera", "PerspectiveCamera"]

export const getAllObjectsWithName = (children: THREE.Object3D[]) => {
    return children.reduce(
        (objectNames: {name: string, id: number}[], obj: THREE.Object3D): {name: string, id: number}[] => {
            if (!defaultNames.includes(obj.name)) {
                objectNames.push({
                    name: obj.name,
                    id: obj.id
                });
            }
            if (obj.children) {
                getAllObjectsWithName(obj.children).map(item => objectNames.push({
                    name: item.name,
                    id: item.id
                }));
            }

            return objectNames;
          },
          [],

    )
} 

// const loaderJSON = new THREE.ObjectLoader();

// loaderJSON.load(
//     // resource URL
//     "models/hand_model.json",

//     // onLoad callback
//     // Here the loaded data is assumed to be an object
//     function (obj) {
//         // Add the loaded object to the scene
//         // if (MainScene)
//         MainScene.add(obj);
//         onLoad()
//     },
//     (err) => { },
//     // // onProgress callback
//     // function ( xhr ) {
//     // 	console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
//     // },

//     // onError callback
//     function (err) {
//         console.error('An error happened');
//     }
// );

// export const onLoad1 = async () => {
//     // console.log(zveno1)
//     // zveno1?.rotation.set(0, 50, 0);
    
//     const zveno1 = MainScene.getObjectByName("zveno1");
//     const zveno2 = MainScene.getObjectByName("zveno2");
//     const zveno3 = MainScene.getObjectByName("zveno3");
//     // zveno2?.rotation.set(50, 0, 0);

    

//     let i = 0;

//     while (true) {
//         const deg = pingPong( i, -90, 90)
//         zveno1?.rotation.set(0, THREE.MathUtils.DEG2RAD * deg || 0, 0);
//         zveno2?.rotation.set(THREE.MathUtils.DEG2RAD * deg * 0.5 || 0, 0, 0);
//         zveno3?.rotation.set(THREE.MathUtils.DEG2RAD * deg || 0, 0, 0);
        
        
//         await sleep(3) 
//         i+=0.05;
//     }
    
// }


// const pingPong = (current: number, min: number, max: number) => {
//     const total_steps = max - min
//     const isIncreases = current % (2*total_steps) < total_steps

//     if (isIncreases) 
//         return max - (current % total_steps)
//     return current % total_steps + min
// }