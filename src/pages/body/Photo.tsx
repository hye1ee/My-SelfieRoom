import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import ContentContainer from "../../components/ContentContainer";
import FrameItem from "../../components/FrameItem";

const Photo = (props: BodyProps) => {
  return (
    <>
      <ContentContainer>
        <FrameItem text="hey">dd</FrameItem>
      </ContentContainer>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Photo;
