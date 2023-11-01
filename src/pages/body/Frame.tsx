import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import FrameItem from "../../components/FrameItem";
import ContentContainer from "../../components/ContentContainer";

const Frame = (props: BodyProps) => {
  return (
    <>
      This is Frame Step
      <ContentContainer style={{ gap: "50px" }}>
        <FrameItem type="1" text="My SelfieRoom" />
        <FrameItem type="2" text="My SelfieRoom" />
        <FrameItem type="3" text="My SelfieRoom" />
      </ContentContainer>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Frame;
