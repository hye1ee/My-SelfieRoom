import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cutState,
  filterState,
  photoState,
  takeState,
} from "../../state/state";
import FrameItem from "../../components/FrameItem";
import styled from "styled-components";
import { getFilterStyle, getPhotoSizeStyle } from "./utils";
import { FilterState } from "../../state/type";

const Filter = (props: BodyProps) => {
  const photo = Array.from(useRecoilValue(photoState) ?? []); // selection
  const take = useRecoilValue(takeState); // photo data
  const cut = useRecoilValue(cutState); // cut number
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <>
      <button onClick={() => setFilter("Once Upon a Time")}>
        Once Upon a Time
      </button>
      <button onClick={() => setFilter("Long Ago")}>Long Ago</button>
      <button onClick={() => setFilter("Today")}>Today</button>
      <button onClick={() => setFilter("Yesterday")}>Yesterday</button>
      <svg
        id="svgfilters"
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="grain">
            <feTurbulence baseFrequency="0.60,0.90" result="colorNoise" />
            <feColorMatrix
              in="colorNoise"
              type="matrix"
              values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
            />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <FrameItem text="Mercury">
        <PhotoWrapper>
          {photo.map((idx) => (
            <PhotoContainer key={idx} size={getPhotoSizeStyle(cut)}>
              <PhotoCanvas
                src={take?.[idx]}
                portrait={photo.length % 2 === 0}
                filter={filter}
              />
            </PhotoContainer>
          ))}
        </PhotoWrapper>
      </FrameItem>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Filter;

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

const PhotoCanvas = styled.img<{ portrait: boolean; filter: FilterState }>`
  ${(props) => (props.portrait ? "height: 100%" : "width: 100%")};
  ${(props) => getFilterStyle(props.filter)}
`;
