import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import Scene from "./Scene";
import {
  Html,
  Loader,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { Dispatch, SetStateAction, Suspense, useRef } from "react";
import { folder, useControls } from "leva";
import { PerspectiveCamera as PCamera } from "three";
import { gsap } from "gsap";
import StartUI from "./components/StartUI";

function App() {
  const sceneCamera = useRef<PCamera>(null);
  const { progress } = useProgress();

  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls("Default Camera", {
      position: folder({
        positionX: {
          value: 15.3,
          min: -100,
          max: 100,
          step: 0.1,
        },
        positionY: {
          value: 4,
          min: -100,
          max: 100,
          step: 0.1,
        },
        positionZ: {
          value: 15,
          min: -100,
          max: 100,
          step: 0.1,
        },
      }),
      rotation: folder({
        rotationX: {
          value: 0,
          min: -100,
          max: 100,
          step: 0.0001,
        },
        rotationY: {
          value: -5.4,
          min: -100,
          max: 100,
          step: 0.0001,
        },
        rotationZ: {
          value: 0,
          min: -100,
          max: 100,
          step: 0.0001,
        },
      }),
    });

  const created = ({ gl }: any) => {
    gl.setClearColor("#262837", 1);
  };

  const moveCamera = (setStart: Dispatch<SetStateAction<boolean>>) => {
    if (sceneCamera.current && sceneCamera.current.position) {
      setStart(true);
      console.log(sceneCamera.current);
      gsap.to(sceneCamera.current.position, {
        x: 4.4,
        y: 2,
        z: 5.1,
        duration: 1.5,
        ease: "sine.out",
      });
    }
  };

  return (
    <AppContainer id="canvas-container">
      <Canvas onCreated={created} shadows>
        <PerspectiveCamera
          ref={sceneCamera}
          makeDefault
          fov={75}
          position={[positionX, positionY, positionZ]}
          rotation={[rotationX, rotationY, rotationZ]}
          near={0.1}
          far={1000}
        />
        <Suspense
          fallback={
            <Html>
              <Loader />
            </Html>
          }
        >
          <Scene />
        </Suspense>
      </Canvas>
      {progress === 100 && <StartUI moveCamera={moveCamera} />}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
