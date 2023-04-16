import * as THREE from "three"
import { Camera } from "three";
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
    
    // console.log(holdTime < 100, holdTime)
    if (holdTime < 200) {
        const cast1 = cast()
        
        if (cast1?.id)
            sendClick(cast1.id)
        console.log("Clicked on: ", cast1?.id, cast1?.name)
        
    }
    
    // isClicked = false
    // console.log(Date.now() - startTime)
    // clickTime = 0
}

function onPointerMove( event: any ) {
    
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

let arrow = new THREE.ArrowHelper()

function cast() {
    // if (isClicked) clickTime++;

	raycaster.setFromCamera( pointer, MainCamera );

	const intersects = raycaster.intersectObjects( MainScene.children );

    // if (arrow) MainScene.remove(arrow)
    // arrow = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 8, 0xff0000 );
    // MainScene.add( arrow );
    if (intersects.length > 0) return intersects[0].object
}

window.addEventListener('pointermove', onPointerMove );
window.addEventListener('mousedown', onDown );
window.addEventListener('mouseup', onUp );

// window.requestAnimationFrame(render);


export const initial = () => {console.log("init")}