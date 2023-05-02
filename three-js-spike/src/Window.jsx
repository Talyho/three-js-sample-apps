import React, { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import windowTexture from '../src/assets/window.jpg'

function Window({ setIsDragging, floorPlane }) {
  const [pos, setPos] = useState([10, 1, 0]); // Intial position of the window
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const texture = new THREE.TextureLoader().load(windowTexture);  // We are loading the texture using THREE.TextureLoader(), this texture is to make the object looks like a window, you can upload any jpg and use it as texture
  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    position: [0, 0, 0],
    position: pos,
    // scale: 1,
    // rotation: [0, 0, 0],
    config: { friction: 30 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1.5, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        // scale: active ? 1.2 : 1,
        // rotation: [y / aspect, x / aspect, 0]
      });
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <animated.mesh position={[0, 0, -3.2]} {...spring} {...bind()} castShadow>
    <boxBufferGeometry ref={dragObjectRef} args={[3, 3, 0.5]} />
    <meshStandardMaterial map={texture} />
  </animated.mesh>
  );
}

export default Window;
