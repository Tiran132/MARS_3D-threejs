import { useEffect, useRef, useState } from "react";
import * as three from "three";


class Cube extends three.Mesh {
    constructor() {
      super();
  
      const geometry = new three.BoxGeometry();
      const material = new three.MeshStandardMaterial();
      material.color.set("blue");
  
      this.geometry = geometry;
      this.material = material;
    }
  
    update() {
      this.rotation.x += 0.01;
      this.rotation.y += 0.01;
    }
  
    dispose() {
      this.geometry.dispose();
    }
  }

const ThreeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderer, setRenderer] = useState<three.WebGLRenderer | null>(null);

  useEffect(() => {
    if (canvasRef.current && !renderer) {
      const scene = new three.Scene();

      const camera = new three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      
      camera.position.z = 5;

      const renderer = new three.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        // alpha: true,
      });
      renderer.setClearColor( 0x000000, 1 );
      renderer.setSize(window.innerWidth, window.innerHeight - 5);
      document.body.appendChild(renderer.domElement);
      setRenderer(renderer)
      console.log(renderer)
      
        const ambientLight = new three.AmbientLight(0xffaaff);
        scene.add(ambientLight);

        const pointLight = new three.PointLight(0xffaaff);

        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const cube = new Cube();
        cube.position.set(0, 0, 0)
        scene.add(cube);

      // //   scene.add(OrbitControls);
    }
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default ThreeCanvas;