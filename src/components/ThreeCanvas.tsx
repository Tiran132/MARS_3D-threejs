import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { PerspectiveCamera } from "three";
import { MainCamera, MainScene } from "../threejs/ObjectManager";

const ThreeCanvas = () => {
  const [scene] = useState(() => MainScene);
  const [camera] = useState(() => MainCamera)

  return (
    <Canvas
      id="main_canvas"
      style={{ width: `100%`, height: `100vh` }}
      shadows
      camera={camera}
    //   camera={{ position: [0, 10, 20], fov: 45 }}
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
