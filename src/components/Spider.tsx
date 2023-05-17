import { Cylinder, Ring, useFBX } from "@react-three/drei";

const Spider = () => {
  const spider = useFBX("/models/spider.fbx");
  return (
    <group>
      <Ring
        position={[1.7, 2.5, 2.3]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[0.02, 0.1, 17, 14]}
      >
        <meshStandardMaterial color="white" wireframe />
      </Ring>
      <Cylinder args={[0.002, 0.002, 0.9, 12]} position={[1.7, 2.1, 2.3]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      <primitive
        object={spider}
        position={[1.7, 1.6, 2.23]}
        scale={0.01}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

export default Spider;
