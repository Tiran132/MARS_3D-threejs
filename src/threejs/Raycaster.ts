import * as THREE from "three"
import { sendClick } from "../WebClient";
import { MainCamera, MainScene } from "./ObjectManager";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


let startTime = 0;

const onDown = () => {
    startTime = Date.now()
}

const onUp = () => {
    const holdTime = Date.now() - startTime;
    
    if (holdTime < 200) {
        const cast1 = cast()
        
        if (cast1?.id)
            sendClick(cast1.id)
    }
}

function onPointerMove( event: any ) {
    
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function cast() {
	raycaster.setFromCamera( pointer, MainCamera );

	const intersects = raycaster.intersectObjects( MainScene.children );

    if (intersects.length > 0) return intersects[0].object
}

window.addEventListener('pointermove', onPointerMove );
window.addEventListener('mousedown', onDown );
window.addEventListener('mouseup', onUp );

export const initial = () => {console.log("init")}