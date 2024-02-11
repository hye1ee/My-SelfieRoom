import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import FrameItem from "../../components/FrameItem";
import ContentContainer from "../../components/ContentContainer";
import SelectContainer from "../../components/SelectContainer";
import { useRecoilState } from "recoil";
import { frameState } from "../../state/state";

const Frame = (props: BodyProps) => {
  const [frame, setFrame] = useRecoilState(frameState);

  return (
    <>
      <ContentContainer style={{ gap: "50px" }}>
        <SelectContainer select={frame === 1} onClick={() => setFrame(1)}>
          <FrameItem type={1} text="My SelfieRoom" input={false} />
        </SelectContainer>
        <SelectContainer select={frame === 2} onClick={() => setFrame(2)}>
          <FrameItem type={2} text="My SelfieRoom" input={false} />
        </SelectContainer>
        <SelectContainer select={frame === 3} onClick={() => setFrame(3)}>
          <FrameItem type={3} text="My SelfieRoom" input={false} />
        </SelectContainer>
      </ContentContainer>
      {frame !== null && (
        <Button text="Next" active={true} onClick={props.onNext} />
      )}
    </>
  );
};
export default Frame;
