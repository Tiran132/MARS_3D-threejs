import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from "three"

const loader = new OBJLoader();
const loaderJSON = new THREE.ObjectLoader();
// loader.setPath("/models/");
// loaderJSON.setPath("/models/")

export const LoadModel_OBJ = (path: string, onLoad: (group: THREE.Group) => void) => {
    console.log(path)
    loader.load("http://localhost:8001/" + path, onLoad)
}

export const LoadModel = async (path: string, onLoad: (group: THREE.Object3D) => void) => {
    console.log(path)
    return new Promise((resolve, reject) => {
        loaderJSON.load(
            "http://localhost:8001/" + path,
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


const textureLoader = new THREE.TextureLoader();

export const loadTexture = (path: string, onLoader: (texture: THREE.Texture) => void) => {
    textureLoader.load(path, onLoader)
}
