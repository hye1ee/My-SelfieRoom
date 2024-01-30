import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import FrameItem from "../../components/FrameItem";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { cutState, photoState, takeState } from "../../state/state";
import { getPhotoSizeStyle } from "./utils";

const Share = (props: BodyProps) => {
  const photo = Array.from(useRecoilValue(photoState) ?? []); // selection
  const take = useRecoilValue(takeState); // photo data
  const cut = useRecoilValue(cutState); // cut number

  return (
    <>
      This is Share Step
      <FrameItem text="Mercury">
        <PhotoWrapper>
          {photo.map((idx) => (
            <PhotoContainer key={idx} size={getPhotoSizeStyle(cut)}>
              <PhotoCanvas
                src={take?.[idx]}
                portrait={photo.length % 2 === 0}
              />
            </PhotoContainer>
          ))}
        </PhotoWrapper>
      </FrameItem>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Share;

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;

  box-sizing: border-box;
  max-height: 60vh;
`;

const PhotoContainer = styled.div<{ size: string }>`
  ${(props) => props.size}

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PhotoCanvas = styled.img<{ portrait: boolean }>`
  ${(props) => (props.portrait ? "height: 100%" : "width: 100%")};
`;
