import { Vector3, Euler, Color } from "three";
import { CommandColor, CommandVector3, CustomElementTypes, ObjectType } from "../types/types"
import * as THREE from "three";

interface CustomObjectTypes {
    object_type: ObjectType
    position: Vector3
    rotation: Euler
    geometry: CommandVector3
    scale: Vector3
    color: Color
}

export interface CustomObjectParams {
    object_type?: ObjectType
    position?: CommandVector3
    rotation?: CommandVector3
    geometry?: CommandVector3
    scale?: CommandVector3
    color?: CommandColor
}

export interface ModelParams {
    path?: string
}

export interface GroupParams {
    object_id?: number
}

const RadialSegments = 20;

export class CustomObject3D implements CustomObjectTypes {
    object_type: ObjectType = "cube";
    position = new Vector3(0, 0, 0);
    rotation = new Euler(0, 0, 0);
    geometry: CommandVector3 = [1, 1, 1];
    scale = new Vector3(1, 1, 1);
    color = new Color(0.5, 0.5, 0.5);
    containerGeometry: THREE.BufferGeometry = new THREE.BoxGeometry(1, 1, 1);
    containerMaterial: THREE.MeshStandardMaterial;
    containerMesh: THREE.Mesh;

    constructor() {
        this.containerMaterial = new THREE.MeshStandardMaterial({ color: this.color })
        this.containerMesh = new THREE.Mesh(this.containerGeometry, this.containerMaterial)
    }

    // public addChild(object: CustomObject3D) {
    //     console.log(this.containerMesh.children)
    //     this.containerMesh.add(object.getMesh())
    //     console.log(this.containerMesh.children)
    // }

    // public removeChild(object: CustomObject3D) {
    //     this.containerMesh.remove(object.getMesh())
    // }

    public setParams(params: CustomObjectParams) {
        if (params.position)
            this.containerMesh.position.set(params.position[0], params.position[1], params.position[2]);
        if (params.rotation)
            this.containerMesh.rotation.set(
                THREE.MathUtils.degToRad(params.rotation[0]),
                THREE.MathUtils.degToRad(params.rotation[1]),
                THREE.MathUtils.degToRad(params.rotation[2])
            );
        if (params.scale)
            this.containerMesh.scale.set(params.scale[0], params.scale[1], params.scale[2]);
        if (params.color)
            // if(this.object_type == "custom")
            //     this.containerMesh.children.map(child => {
            //         if (child instanceof THREE.Object3D) {
            //             child.mater
            //         }
            //     })
            this.containerMaterial.color.setRGB(params.color[0] / 255, params.color[1] / 255, params.color[2] / 255);

        if (params.geometry) this.geometry = params.geometry;

        if (params.object_type && params.object_type != this.object_type) {
            this.setGeometry(params.object_type)
            this.object_type = params.object_type;
        }
    }

    setGeometry(_objectType: ObjectType) {
        let newGeometry: THREE.BufferGeometry = this.containerGeometry;

        switch (_objectType) {
            case "cube":
                newGeometry = new THREE.BoxGeometry(this.geometry[0], this.geometry[1], this.geometry[2])
                break;
            case "sphere":
                newGeometry = new THREE.SphereGeometry(this.geometry[0] / 2, RadialSegments, RadialSegments)
                break;
            case "cone":
                newGeometry = new THREE.ConeGeometry(this.geometry[0] / 2, this.geometry[1], RadialSegments)
                break;
            case "cylinder":
                newGeometry = new THREE.CylinderGeometry(this.geometry[0] / 2, this.geometry[0] / 2, this.geometry[1], RadialSegments)
                break;
            case "torus":
                newGeometry = new THREE.TorusGeometry(this.geometry[0] / 2, this.geometry[1] / 2, RadialSegments, RadialSegments)
                break;
            case "group":
                newGeometry = new THREE.BufferGeometry()
                break;
            case "custom":
                newGeometry = new THREE.BufferGeometry()
                break;
            default:
                newGeometry = new THREE.BoxGeometry(this.geometry[0], this.geometry[1], this.geometry[2])
                break;
        }

        this.containerMesh.geometry = newGeometry
    }

    public getMesh() {
        return this.containerMesh;
    }
}


const defaultParams: {
    object_type: ObjectType
    geometry: CommandVector3
    position: Vector3,
    rotation: Euler,
    scale: Vector3,
    color: Color
} = {
    object_type: "cube",
    position: new Vector3(0, 0, 0),
    rotation: new Euler(0, 0, 0),
    geometry: [1, 1, 1],
    scale: new Vector3(1, 1, 1),
    color: new Color(0.5, 0.5, 0.5),
}

export const createObject = (params: CustomObjectParams) => {
    const object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: defaultParams.color}))
    
    setParamsToObject3D(object, params)

    if (params.object_type) {
        setGeometry(object, params.object_type, params.geometry)
    }

    return object
}

export const setParamsToObject3D = (object: THREE.Mesh | THREE.Object3D, params: CustomObjectParams) => {
    if (params.position)
        object.position.set(params.position[0], params.position[1], params.position[2]);
    if (params.rotation)
        object.rotation.set(
            THREE.MathUtils.degToRad(params.rotation[0]),
            THREE.MathUtils.degToRad(params.rotation[1]),
            THREE.MathUtils.degToRad(params.rotation[2])
        );
    if (params.scale)
        object.scale.set(params.scale[0], params.scale[1], params.scale[2]);


    // console.log(object)
    if (!(object instanceof THREE.Mesh)) return;
    const material = new THREE.MeshStandardMaterial() 
    if (params.color)
        object.material = material
    
    if (params.color && object.material instanceof THREE.MeshStandardMaterial)
        object.material.color.setRGB(params.color[0] / 255, params.color[1] / 255, params.color[2] / 255);
}


const setGeometry = (object: THREE.Object3D, _objectType: ObjectType, geometry: CommandVector3 = [1, 1, 1]) => {
    if (!(object instanceof THREE.Mesh)) return;
    
    let newGeometry: THREE.BufferGeometry = object.geometry;
    
    if (geometry)
    switch (_objectType) {
        case "cube":
            newGeometry = new THREE.BoxGeometry(geometry[0], geometry[1], geometry[2])
            break;
        case "sphere":
            newGeometry = new THREE.SphereGeometry(geometry[0] / 2, RadialSegments, RadialSegments)
            break;
        case "cone":
            newGeometry = new THREE.ConeGeometry(geometry[0] / 2, geometry[1], RadialSegments)
            break;
        case "cylinder":
            newGeometry = new THREE.CylinderGeometry(geometry[0] / 2, geometry[0] / 2, geometry[1], RadialSegments)
            break;
        case "torus":
            newGeometry = new THREE.TorusGeometry(geometry[0] / 2, geometry[1] / 2, RadialSegments, RadialSegments)
            break;
        case "group":
            newGeometry = new THREE.BufferGeometry()
            break;
        case "custom":
            newGeometry = new THREE.BufferGeometry()
            break;
        default:
            newGeometry = new THREE.BoxGeometry(geometry[0], geometry[1], geometry[2])
            break;
    }

    object.geometry = newGeometry
}