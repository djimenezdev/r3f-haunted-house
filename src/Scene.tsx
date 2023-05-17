import { OrbitControls, Ring, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Fragment, RefObject, useRef } from "react";
import { PointLight, RepeatWrapping, Vector3 } from "three";
import Bush from "./components/Bush";
import { getRandomNumberBetween } from "./utils/func";
import Spider from "./components/Spider";
import { PerspectiveCamera } from "three";

type SceneProps = {
  camerasRef: RefObject<PerspectiveCamera>;
};

const Scene = ({ camerasRef }: SceneProps) => {
  const ghost1 = useRef<PointLight>(null);
  const ghost2 = useRef<PointLight>(null);
  const ghost3 = useRef<PointLight>(null);
  const orbitControlsRef = useRef<any>(null);

  const doorTextures = useTexture({
    map: "/textures/door/color.jpg",
    alphaMap: "/textures/door/alpha.jpg",
    normalMap: "/textures/door/normal.jpg",
    displacementMap: "/textures/door/height.jpg",
    aoMap: "/textures/door/ambientOcclusion.jpg",
    roughnessMap: "/textures/door/roughness.jpg",
    metalnessMap: "/textures/door/metalness.jpg",
  });
  const wallTextures = useTexture({
    map: "/textures/bricks/color.jpg",
    normalMap: "/textures/bricks/normal.jpg",
    aoMap: "/textures/bricks/ambientOcclusion.jpg",
    roughnessMap: "/textures/bricks/roughness.jpg",
  });
  const grassTextures = useTexture(
    {
      map: "/textures/grass/color.jpg",
      normalMap: "/textures/grass/normal.jpg",
      aoMap: "/textures/grass/ambientOcclusion.jpg",
      roughnessMap: "/textures/grass/roughness.jpg",
    },
    (ts) => {
      const textures = ts as any[];
      textures.forEach((texture) => {
        texture.repeat.set(8, 8);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
      });
    }
  );
  const stoneTextures = useTexture({
    map: "/textures/stone/color.jpg",
    normalMap: "/textures/stone/normal.jpg",
    aoMap: "/textures/stone/ambientOcclusion.jpg",
    roughnessMap: "/textures/stone/roughness.jpg",
  });

  const gravesArr = new Array(50).fill("");

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const ghost1Angle = elapsedTime * 0.5;
    if (ghost1.current) {
      ghost1.current.position.x = Math.cos(ghost1Angle) * 4;
      ghost1.current.position.z = Math.sin(ghost1Angle) * 4;
      ghost1.current.position.y = Math.sin(elapsedTime * 3);
    }

    const ghost2Angle = -elapsedTime * 0.32;
    if (ghost2.current) {
      ghost2.current.position.x = Math.cos(ghost2Angle) * 5;
      ghost2.current.position.z = Math.sin(ghost2Angle) * 5;
      ghost2.current.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    }

    const ghost3Angle = -elapsedTime * 0.18;
    if (ghost3.current) {
      ghost3.current.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
      ghost3.current.position.z =
        Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
      ghost3.current.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    }
    if (orbitControlsRef.current) {
      if (!orbitControlsRef.current.enabled && camerasRef.current) {
        if (camerasRef.current.position.distanceTo(new Vector3(0, 0, 0)) >= 6) {
          orbitControlsRef.current.enabled = true;
        }
      }
    }
  });

  return (
    <>
      <ambientLight color="#b9d5ff" intensity={0.12} />
      <directionalLight
        color="#b9d5ff"
        position={[4, 5, -2]}
        intensity={0.12}
        castShadow
        shadow-mapSize={256}
      />
      <fog attach="fog" color={0x262837} near={1} far={15} />
      <OrbitControls ref={orbitControlsRef} enabled={false} />
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial {...grassTextures} />
      </mesh>
      <group>
        <mesh position={[0, 1.25, 0]} castShadow>
          <boxGeometry args={[4, 2.5, 4]} />
          <meshStandardMaterial {...wallTextures} />
        </mesh>
        <Spider />
        <mesh position={[0, 3, 0]} rotation={[0, Math.PI * 0.25, 0]}>
          <coneGeometry args={[3.5, 1, 4]} />
          <meshStandardMaterial color={"#b35f45"} />
        </mesh>
        <pointLight
          args={["#ff7d46", 1, 7]}
          position={[0, 2.2, 2.7]}
          castShadow
          shadow-mapSize={256}
          shadow-camera-far={7}
        />
        <mesh position={[0, 1, 2.01]}>
          <planeGeometry args={[2.2, 2.2, 100, 100]} />
          <meshStandardMaterial
            transparent
            displacementScale={0.1}
            {...doorTextures}
          />
        </mesh>
        <Bush scale={0.5} position={[1.5, 0.2, 2.2]} />
        <Bush scale={0.25} position={[1.8, 0.1, 2.6]} />
        <Bush scale={0.4} position={[-1.5, 0.1, 2.2]} />
        <Bush scale={0.15} position={[-1.8, 0.05, 2.6]} />
      </group>
      <group>
        {gravesArr.map((el, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 4 + Math.random() * 5;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotateY = (Math.random() - 0.5) * 0.4;
          const rotateZ = (Math.random() - 0.5) * 0.4;
          const webX = getRandomNumberBetween(-0.16, 0.16);
          const webY = getRandomNumberBetween(-0.17, 0.2);

          return (
            <Fragment key={i + el}>
              <mesh
                position={[x, 0.3, z]}
                rotation={[0, rotateY, rotateZ]}
                castShadow
              >
                <boxGeometry args={[0.6, 0.8, 0.2]} />
                <meshStandardMaterial {...stoneTextures} />
                <Text
                  position={[0, 0.15, 0.11]}
                  fontSize={0.23}
                  color="white"
                  font="/fonts/shlop.otf"
                >
                  R.I.P
                </Text>
                {Math.random() - 0.5 > 0 && (
                  <Ring
                    args={[0.02, 0.1, 17, 14]}
                    position={[webX, webY, 0.111]}
                  >
                    <meshBasicMaterial color="white" wireframe />
                  </Ring>
                )}
              </mesh>
            </Fragment>
          );
        })}
      </group>
      <pointLight ref={ghost1} args={["#ff00ff", 2, 3]} castShadow />
      <pointLight ref={ghost2} args={["#00ffff", 2, 3]} castShadow />
      <pointLight ref={ghost3} args={["#ffff00", 2, 3]} castShadow />
    </>
  );
};

export default Scene;
