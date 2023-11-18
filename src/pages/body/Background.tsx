import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import ContentContainer from "../../components/ContentContainer";
import FrameItem from "../../components/FrameItem";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { backgroundState, frameState } from "../../state/state";

import MecuryImg from "../../assets/background/mercury.png";
import NeptuneImg from "../../assets/background/neptune.png";
import OriginImg from "../../assets/background/origin.png";
import SaturnImg from "../../assets/background/saturn.png";
import UranusImg from "../../assets/background/uranus.png";
import SelectContainer from "../../components/SelectContainer";

const Background = (props: BodyProps) => {
  const frame = useRecoilValue(frameState);
  const [back, setBack] = useRecoilState(backgroundState);

  return (
    <>
      <ContentContainer style={{ gap: "20px", marginTop: "15px" }}>
        <SelectContainer select={back == 1} onClick={() => setBack(1)}>
          <FrameItem
            type={frame ?? 3}
            text="Mercury"
            style={{ transform: "rotate(-2deg)" }}
          >
            <BackgroundImg src={MecuryImg} />
          </FrameItem>
        </SelectContainer>
        <SelectContainer
          select={back == 2}
          onClick={() => setBack(2)}
          style={{ transform: "rotate(-2deg)" }}
        >
          <FrameItem type={frame ?? 3} text="Neptune">
            <BackgroundImg src={NeptuneImg} />
          </FrameItem>
        </SelectContainer>

        <SelectContainer
          select={back == 3}
          onClick={() => setBack(3)}
          style={{ transform: "rotate(-2deg)" }}
        >
          <FrameItem type={frame ?? 3} text="Origin">
            <BackgroundImg src={OriginImg} />
          </FrameItem>
        </SelectContainer>

        <SelectContainer
          select={back == 4}
          onClick={() => setBack(4)}
          style={{ transform: "rotate(-2deg)" }}
        >
          <FrameItem type={frame ?? 3} text="Saturn">
            <BackgroundImg src={SaturnImg} />
          </FrameItem>
        </SelectContainer>

        <SelectContainer
          select={back == 5}
          onClick={() => setBack(5)}
          style={{ transform: "rotate(-2deg)" }}
        >
          <FrameItem type={frame ?? 3} text="Uranus">
            <BackgroundImg src={UranusImg} />
          </FrameItem>
        </SelectContainer>
      </ContentContainer>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Background;

const BackgroundImg = styled.img`
  width: 16vw;
  height: 16vw;
`;
