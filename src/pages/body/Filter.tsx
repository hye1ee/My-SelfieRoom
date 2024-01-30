import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import { useRecoilValue } from "recoil";
import { cutState, photoState, takeState } from "../../state/state";
import FrameItem from "../../components/FrameItem";
import styled from "styled-components";

const Filter = (props: BodyProps) => {
  const photo = Array.from(useRecoilValue(photoState) ?? []); // selection
  const take = useRecoilValue(takeState); // photo data
  const cut = useRecoilValue(cutState); // cut number

  return (
    <>
      This is Filter Step
      {photo.map((idx) => (
        <FrameItem text="" key={idx}>
          <PhotoCanvas src={take?.[idx]} />
        </FrameItem>
      ))}
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Filter;

const PhotoCanvas = styled.img`
  width: 17vw;
`;
