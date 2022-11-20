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

    public setParams(params: CustomObjectParams) {
        if (params.position)
            this.containerMesh.position.set(params.position[0], params.position[1], params.position[2]);
        if (params.rotation)
            this.containerMesh.rotation.set(params.rotation[0], params.rotation[1], params.rotation[2]);
        if (params.scale)
            this.containerMesh.scale.set(params.scale[0], params.scale[1], params.scale[2]);
        if (params.color)
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
                default:
                    break;
            }

            // this.containerGeometry = newGeometry;
            this.containerMesh.geometry = newGeometry
    }

    public getMesh() {
        return this.containerMesh;
    }
}