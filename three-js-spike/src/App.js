import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Window from "./Window.jsx";
import Door from "./Door.jsx";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Interface } from "./components/Interface";
import { useConfigurator } from "./contexts/Configurator.jsx";

// NOTE: We can import different texture and use it as a "skin" of an object`
import brickTexture from '../src/assets/brick.jpg';

export default function App() {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = new THREE.TextureLoader().load(brickTexture); // We are loading the texture using THREE.TextureLoader(), this texture is to make the object looks like a wall, you can upload any jpg and use it as texture
  const { windowCount, doors } = useConfigurator(); // This is a context so that we can get the value of the windowCount from the Configurator.jsx

  const Windows = () =>{
    const arr = [];
    for (let i = 0; i < windowCount; i++) {
      arr.push(<Window setIsDragging={setIsDragging} floorPlane={floorPlane} />)
    }
    return arr;
  }

  const Doors = () =>{
    const arr = [];
    for (let i = 0; i < doors; i++) {
      arr.push(<Door setIsDragging={setIsDragging} floorPlane={floorPlane} />)
    }
    return arr;
  }
  
  return (
    <>
    <Canvas style={{ background: "white" }} shadows dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={1512}
        shadow-mapSize-width={1512}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[50, 50]} receiveShadow />
        <meshPhongMaterial
          attach="material"
          color="#ffffff"
          side={THREE.DoubleSide}
          receiveShadow
        />
      </mesh>

      <gridHelper args={[100, 100]} />

      <Window setIsDragging={setIsDragging} floorPlane={floorPlane} />
      {/* These are the walls */}
      {Doors().map((components) => components)}
       {/* Wall 1 */}
      <mesh position={[0, 0, -3.2]}>  {/* Mesh is the most important part of the canvas, this is the object that you will on the Canvas */}
        <boxBufferGeometry args={[10, 10, 0.5]} /> {/* boxBufferGeometry comes from the @react-three/fiber Canvas */}
        <meshStandardMaterial map={texture} />
      </mesh>

       {/* Wall 2 */}
      <mesh position={[5, 1, 2.5]}>
        <boxBufferGeometry args={[0.5, 8, 12]} />
        <meshStandardMaterial map={texture} />
      </mesh>

       {/* Wall 3 */}
      <mesh position={[-5, 1, 2.5]}>
        <boxBufferGeometry args={[0.5, 8, 12]} />
        <meshStandardMaterial map={texture} />
      </mesh>

       {/* Wall 4 */}
      <mesh position={[0, 0, 8.25]}> 
        <boxBufferGeometry args={[10, 10, 0.5]} />  
        <meshStandardMaterial map={texture} /> 
      </mesh>


      {Windows().map((components) => components)}  {/* Rendering Windows */}
    
      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
    </Canvas>
     <Interface />
     </>
  );
}
