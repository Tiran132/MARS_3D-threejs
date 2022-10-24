import { Box, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
// import WebSocket from "ws";

interface AnimatedBoxProps {
  position: Vector3;
}

function AnimatedBox({ position }: AnimatedBoxProps) {
  const ref = useRef<Mesh>(null);
    const [frame, setFrame] = useState(0);

    useFrame(() => {
      if (!ref.current) return;

    //   ref.current.position.set(position.x, position.y, position.z);
    //   ref.current.position.x = -Math.sin(frame) * 2;
    //   ref.current.position.y = Math.sin(frame) * 2;
      
      ref.current.position.lerp(position, 0.1)

      setFrame(frame+1/100)
    });

  return (
    <mesh position={position} ref={ref} onClick={() => console.log(position)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

const BoxPos = new Vector3(0, 0, 0);
const BoxPos1 = new Vector3(0, 1, 0);
const BoxPos2 = new Vector3(2, 1, 3);

const MainCanvas = () => {
  const [boxPos1, setBoxPos1] = useState<Vector3>(BoxPos1);
  const [boxPos2, setBoxPos2] = useState<Vector3>(BoxPos2);
  useEffect(() => {
      const ws = new WebSocket("ws://localhost:5000/");
      ws.onopen = () => {
          console.log("bobus");
          // ws.send("yey")
        };

    // const wss = new WebSocket.Server({port: 5000}, () => {
    //      console.log("server started")
    // })
    // ws.onopen = () => {
    //     ws.send("bobus")
    // }

    const setPos = (id: string, data: [number, number, number]) => {
        let newPos = id == "2" ? boxPos2 : boxPos1;
        
        newPos.x += data[0];
        newPos.y += data[1];
        newPos.z += data[2];

        id == "2" ? setBoxPos2(newPos) : setBoxPos1(newPos);
    };

    ws.onmessage = (ev) => {
      const [id, command] = `${ev.data}`.split("&")


      switch (command) {
        case "right":
          setPos(id, [1, 0, 0]);
          break;

        case "left":
          setPos(id, [-1, 0, 0]);
          break;

        case "up":
          setPos(id, [0, 1, 0]);
          break;

        case "down":
          setPos(id, [0, -1, 0]);
          break;
      }
    };
  }, []);


  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 2, 5], zoom: 1 }}
    >
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[6, 3, 1]} />
      <AnimatedBox position={boxPos1} />
      <AnimatedBox position={boxPos2} />
      <Box onClick={() => {console.log("abobus")}} position={BoxPos} args={[10, 0.000001, 10]}>
        <meshStandardMaterial color={"darkblue"} />
      </Box>
    </Canvas>
  );
};

export default MainCanvas;
