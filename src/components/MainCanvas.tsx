import { Box, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  CommandType,
  CommandTypeArgs,
  CommandVector3,
  CustomElementTypes,
} from "../types/types";
// import WebSocket from "ws";

interface AnimatedBoxProps {
  position: THREE.Vector3;
}

function AnimatedBox({ position }: AnimatedBoxProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [frame, setFrame] = useState(0);

  useFrame(() => {
    if (!ref.current) return;

    //   ref.current.position.set(position.x, position.y, position.z);
    //   ref.current.position.x = -Math.sin(frame) * 2;
    //   ref.current.position.y = Math.sin(frame) * 2;

    ref.current.position.lerp(position, 0.1);

    setFrame(frame + 1 / 100);
  });

  return (
    <mesh position={position} ref={ref} onClick={() => console.log(position)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

const zeroVector3 = new THREE.Vector3(0, 0, 0);
const onesVector3 = new THREE.Vector3(1, 1, 1);
const defaultRotation = new THREE.Euler(0, 0, 0);
const defaultColor = new THREE.Color(50 / 255, 168 / 255, 82 / 255);

const str: "cube" | "sphere" = "cube";
const defaultGeometry: [x: number, y: number, z: number] = [1, 1, 1];

const defaultParams = {
  object_type: str,
  position: zeroVector3,
  rotation: defaultRotation,
  geometry: defaultGeometry, // Размеры в 3 плоскостях
  scale: onesVector3,
  color: defaultColor,
};

interface CustomElementType {
  data: CustomElementTypes;
}

function CustomElement({ data: props }: CustomElementType) {
  const ref = useRef<THREE.Mesh>(null);

  const [object_type, setObject_type] = useState<"cube" | "sphere">("cube");
  const [position, setPosition] = useState(zeroVector3);
  const [rotation, setRotation] = useState(defaultRotation);
  const [geometry, setGeomety] = useState<[x: number, y: number, z: number]>([
    1, 1, 1,
  ]);
  const [scale, setScale] = useState(onesVector3);
  const [color, setColor] = useState(defaultColor);

  //   const [currentParams, setCurrentParams] = useState<typeof defaultParams>(defaultParams)

  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    console.log("effect");
    setIsCurrent(false);
    setObject_type(props.object_type || object_type);
    setPosition(props.position || position);
    setRotation(props.rotation || rotation);
    setGeomety(props.geometry || geometry);
    setScale(props.scale || scale);
    setColor(props.color || color);
  }, [props.position]);

  useFrame(() => {
    if (isCurrent) return;
    if (!ref.current) return;

    console.log("frame");

    ref.current.position.set(position.x, position.y, position.z);
    ref.current.rotation.set(rotation.x, rotation.y, rotation.z);
    ref.current.scale.set(scale.x, scale.y, scale.z);

    setIsCurrent(true);
  });

  return (
    <mesh
      position={position}
      ref={ref}
      rotation={rotation}
      scale={scale}
      onClick={() => console.log(position)}
    >
      {props.object_type == "cube" ? (
        <boxGeometry args={geometry} />
      ) : (
        <sphereGeometry args={geometry} />
      )}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const ElementIndexed = (props: CustomElementTypes, id: number) => {
  const createdElement = <CustomElement data={props} />;

  return [createdElement, id];
};

const BoxPos = new THREE.Vector3(0, 0, 0);
const BoxPos1 = new THREE.Vector3(0, 1, 0);
const BoxPos2 = new THREE.Vector3(2, 1, 3);

const MainCanvas = () => {
  const [boxPos1, setBoxPos1] = useState<THREE.Vector3>(BoxPos1);
  const [boxPos2, setBoxPos2] = useState<THREE.Vector3>(BoxPos2);

  const [createdObjects, setCreatedObjects] = useState<any[]>([]);
  const [objectsData, setObjectsData] = useState<typeof defaultParams[]>([
    {
      object_type: str,
      position: zeroVector3.set(0, 1, 0),
      rotation: defaultRotation,
      geometry: defaultGeometry, // Размеры в 3 плоскостях
      scale: onesVector3,
      color: defaultColor,
    },
  ]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/");
    ws.onopen = () => {
      console.log("Opened session");
      // ws.send("yey")
    };

    const setPos = (id: string, data: [number, number, number]) => {
      let newPos = id == "2" ? boxPos2 : boxPos1;

      newPos.x += data[0];
      newPos.y += data[1];
      newPos.z += data[2];

      id == "2" ? setBoxPos2(newPos) : setBoxPos1(newPos);
    };

    ws.onmessage = (ev) => {
      //   const [id, command] = `${ev.data}`.split("&");
      try {
        const command: CommandType = JSON.parse(ev.data);

        if (createdObjects.length < 0) {
          createdObjects.push(defaultParams);
        }

        if (objectsData.length > 0) {
          const c = command.args;
          // if ("object_type" in c) objectsData[0].object_type = c.object_type;
          if ("position" in c)
            objectsData[0].position = new THREE.Vector3(
              c.position![0],
              c.position![1],
              c.position![2]
            );
          if ("rotation" in c)
            objectsData[0].rotation = new THREE.Euler(
              c.rotation![0],
              c.rotation![1],
              c.rotation![2]
            );
          if ("geometry" in c)
            objectsData[0].geometry = [c.scale![0], c.scale![1], c.scale![2]];
          if ("scale" in c)
            objectsData[0].scale = new THREE.Vector3(
              c.scale![0],
              c.scale![1],
              c.scale![2]
            );
          if ("color" in c)
            objectsData[0].color = new THREE.Color(
              c.color![0],
              c.color![1],
              c.color![2]
            );
        }

        // switch (command.type) {
        //     case "create":
        //     //   setPos( [1, 0, 0]);
        //       break;

        //   }
        // switch (command.type) {
        //   case "create":
        //     break;

        //   case "update":
        //     break;

        //   default:
        //     break;
        // }
      } catch {}
    };
  }, []);

  const addShape = () => {
    const [newElement, id] = ElementIndexed(defaultParams, 1);
    console.log(newElement);
    setCreatedObjects([
      ...createdObjects,
      newElement,
      // <CustomElement data={defaultParams} />
    ]);
  };

  const addCommand = () => {
    const command: CommandTypeArgs = JSON.parse(v);

    if (objectsData.length > 0) {
      const c = command;
    //   const currentObjectData = 
      let updated = objectsData[0]
      
    
      // if ("object_type" in c) objectsData[0].object_type = c.object_type;
      if ("position" in c)
        updated.position = new THREE.Vector3(
          c.position![0],
          c.position![1],
          c.position![2]
        );
      if ("rotation" in c)
        updated.rotation = new THREE.Euler(
          c.rotation![0],
          c.rotation![1],
          c.rotation![2]
        );
      if ("geometry" in c)
        updated.geometry = [c.scale![0], c.scale![1], c.scale![2]];
      if ("scale" in c)
        updated.scale = new THREE.Vector3(
          c.scale![0],
          c.scale![1],
          c.scale![2]
        );
      if ("color" in c)
        updated.color = new THREE.Color(
          c.color![0],
          c.color![1],
          c.color![2]
        );
      setObjectsData([updated])
        // render()
      // if ("position" in c) objectsData[0].position = new THREE.Vector3(c.position.x, c.position.y, c.position.z)
      // if ("rotation" in c) objectsData[0].rotation = new THREE.Euler(c.rotation.x, c.rotation.y, c.rotation.z)
      // if ("geometry" in c) objectsData[0].geometry = [...c.geometry]; // [c.geometry[0], c.geometry[1], c.geometry[2]]
      // if ("scale" in c) objectsData[0].scale = new THREE.Vector3(c.scale.x, c.scale.y, c.scale.z)
      // if ("color" in c) objectsData[0].color = new THREE.Color(c.color)
    }
  };

  const [v, setV] = useState(
    `{
        "object_type":"cube",
        "position":[0, 0, 0],
        "rotation":[0, 0, 0]
     }`
  );

  const handleChange = (event: any) => {
    setV(event.target.value);
  };

  return (
    <>
      <button onClick={() => addShape()}>Добавить объект</button>
      <button onClick={() => addCommand()}>Команда</button>

      <textarea
        onChange={(e) => handleChange(e)}
        style={{ height: "100px", width: "50%" }}
        value={v}
      />

      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: [0, 2, 5], zoom: 1 }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[6, 3, 1]} />
        {/* <AnimatedBox position={boxPos1} />
        <AnimatedBox position={boxPos2} /> */}

        {objectsData.map((data) => {
          console.log(data);
          return <CustomElement data={data} />;
        })}

        <Box
          onClick={() => {
            console.log("abobus");
          }}
          position={BoxPos}
          args={[10, 0.000001, 10]}
        >
          <meshStandardMaterial color={"darkblue"} />
        </Box>
      </Canvas>
    </>
  );
};

export default MainCanvas;
