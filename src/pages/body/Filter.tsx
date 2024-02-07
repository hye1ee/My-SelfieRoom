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
import PhotoItem from "../../components/PhotoItem";
import ContentContainer from "../../components/ContentContainer";

const Filter = (props: BodyProps) => {
  const photo = useRecoilValue(photoState) ?? ({} as Set<number>); // selection
  const take = useRecoilValue(takeState) ?? ([] as string[]); // photo data
  const cut = useRecoilValue(cutState) ?? "one"; // cut number
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <>
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

      <ContentContainer style={{ gap: "15px", marginTop: "30px" }}>
        <FrameItem text={"Once Upon a Time"}>
          <PhotoItem
            targetFilter="Once Upon a Time"
            cut={cut}
            filter={filter}
            take={take}
            photo={photo}
            onClick={() => setFilter("Once Upon a Time")}
          />
        </FrameItem>
        <FrameItem text={"Long Ago"}>
          <PhotoItem
            targetFilter="Long Ago"
            cut={cut}
            filter={filter}
            take={take}
            photo={photo}
            onClick={() => setFilter("Long Ago")}
          />
        </FrameItem>
        <FrameItem text={"Yesterday"}>
          <PhotoItem
            targetFilter="Yesterday"
            cut={cut}
            filter={filter}
            take={take}
            photo={photo}
            onClick={() => setFilter("Yesterday")}
          />
        </FrameItem>
        <FrameItem text={"Today"}>
          <PhotoItem
            targetFilter="Today"
            cut={cut}
            filter={filter}
            take={take}
            photo={photo}
            onClick={() => setFilter("Today")}
          />
        </FrameItem>
      </ContentContainer>

      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Filter;
