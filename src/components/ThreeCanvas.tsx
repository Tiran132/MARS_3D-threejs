import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { MainScene } from "../threejs/ObjectManager";

const ThreeCanvas = () => {
  const [scene] = useState(() => MainScene);
  
  return (
    <Canvas
      style={{ width: `100%`, height: `100vh` }}
      shadows
      camera={{ position: [10, 0, 80], fov: 45 }}
    >
      <primitive object={scene} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[6, 3, 1]} />
      <gridHelper args={[15, 15]} position={[0, -0.5, 0]} />
      <Stats />
    </Canvas>
  );
};

export default ThreeCanvas;

// const ws = new WebSocket("ws://localhost:5000/");
// ws.onopen = () => {
//   console.log("Opened session");
//   // ws.send("yey")
// };

// ws.onmessage = (ev) => {
//   try {
//     const command = JSON.parse(ev.data);
//   } catch {}
// };
