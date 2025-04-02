import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Robot({ position }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = position[0];
      ref.current.position.z = position[2];
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Robot;
