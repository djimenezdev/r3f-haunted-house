import { gsap } from "gsap";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

type StartUIProps = {
  moveCamera: (setStart: Dispatch<SetStateAction<boolean>>) => void;
};

const StartUI = ({ moveCamera }: StartUIProps) => {
  const [start, setStart] = useState(false);
  const startContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (start) {
      gsap.to(startContainerRef.current, {
        duration: 1,
        opacity: 0,
        display: "none",
      });
    } else {
      gsap.fromTo(
        startContainerRef.current,
        {
          opacity: 0,
          display: "none",
        },
        {
          opacity: 1,
          display: "flex",
          delay: 1,
          duration: 2,
        }
      );
    }
  }, [start]);

  return (
    <StartContainer ref={startContainerRef}>
      <StartTitle className="shlop-font">Haunted House</StartTitle>
      <StartButton className="shlop-font" onClick={() => moveCamera(setStart)}>
        Start
      </StartButton>
    </StartContainer>
  );
};

export default StartUI;

const StartContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 15;
`;

const StartTitle = styled.h1`
  font-size: 8rem;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #fff;
`;

const StartButton = styled.button`
  outline: none;
  transition: all 0.4s ease-out;
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  max-width: 250px;
  width: 100%;
  &:hover {
    background-color: #fff;
    color: #000;
    text-shadow: 0 0 10px #000;
  }
`;
