// interface CommandVector3 {
//     x: number
//     y: number
//     z: number
// } 

import { Color, Euler, Vector3 } from "three";

export type CommandVector3 = [x: number, y: number, z: number]


export interface CommandType {
    object_id: number;
    type: "create" | "update" | "join" | "remove";
    args: {
        object_type: "cube" | "sphere"
        position?: CommandVector3
        rotation?: CommandVector3
        geometry?: CommandVector3 // Размеры в 3 плоскостях
        scale?:	   CommandVector3
        color?:    CommandVector3
        parentId?: number
    }
}

export interface CustomElementTypes {
    object_type: "cube" | "sphere"
    position?: Vector3
    rotation?: Euler
    geometry?: CommandVector3 // Размеры в 3 плоскостях
    scale?:	   Vector3
    color?:    Color
}

export interface ObjectWithId {
    id: number
    object: (props: CommandType) => JSX.Element
}