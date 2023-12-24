import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import ContentContainer from "../../components/ContentContainer";
import FrameItem from "../../components/FrameItem";
import { useRecoilValue } from "recoil";
import { takeState } from "../../state/state";
import styled from "styled-components";

const Photo = (props: BodyProps) => {
  const take = useRecoilValue(takeState);

  return (
    <>
      <ContentContainer>
        {take?.map((url, idx) => (
          <FrameItem key={idx} text="hey">
            <PhotoCanvas src={url} />
          </FrameItem>
        ))}
      </ContentContainer>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Photo;

const PhotoCanvas = styled.img`
  width: 20vw;
`;
