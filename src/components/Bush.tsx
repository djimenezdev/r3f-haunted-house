import { Vector3 } from "three";

type BushProps = {
  position: [number, number, number] | Vector3;
  scale: number;
};

const Bush = ({ position, scale }: BushProps) => {
  return (
    <mesh scale={scale} position={position} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={"#89c854"} />
    </mesh>
  );
};

export default Bush;
