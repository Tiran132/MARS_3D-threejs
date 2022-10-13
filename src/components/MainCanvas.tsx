import { Box, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

interface AnimatedBoxProps {
    position: Vector3
}

function AnimatedBox({ position }: AnimatedBoxProps) {
  const ref = useRef<Mesh>(null);
  const [frame, setFrame] = useState(0);


  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.x = -Math.sin(frame) * 2;
    ref.current.position.y = Math.sin(frame) * 2;

    setFrame(frame+1/100)
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

const BoxPos = new Vector3(0, 0, 0);

const MainCanvas = () => {
  return (
    <Canvas
      style={{ height: "80vh", width: "100vw" }}
      camera={{ position: [0, 2, 5], zoom: 1 }}
    >
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[6, 3, 1]} />
      <AnimatedBox position={BoxPos} />
      <Box position={[0, -3, 0]} args={[10, 0.000001, 10]}>
        <meshStandardMaterial color={"darkblue"} />
      </Box>
    </Canvas>
  );
};

export default MainCanvas;
