import React, { useRef, useState } from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import FrameItem, { getFrameStyle } from "../../components/FrameItem";
import { useRecoilValue } from "recoil";
import {
  cutState,
  filterState,
  photoState,
  takeState,
} from "../../state/state";
import PhotoItem from "../../components/PhotoItem";
import ContentContainer from "../../components/ContentContainer";
import styled from "styled-components";
import { color } from "../../styles/color";
import Text from "../../styles/text";

import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import { getFilterStyle } from "./utils";

const Share = (props: BodyProps) => {
  const photo = useRecoilValue(photoState) ?? ({} as Set<number>); // selection
  const take = useRecoilValue(takeState) ?? ([] as string[]); // photo data
  const cut = useRecoilValue(cutState) ?? "one"; // cut number
  const filter = useRecoilValue(filterState);

  const downloadRef = useRef<HTMLDivElement>(null);

  const onDownload = () => {
    const target = document.getElementById("frame-download");
    if (target === null || undefined) return;

    // html2canvas(target).then((canvas: HTMLCanvasElement) => {
    //   const dataUrl = canvas.toDataURL();
    //   const newCanvas = document.getElementById("canvas") as HTMLCanvasElement;
    //   if (newCanvas === null) return;

    //   const ctx = newCanvas.getContext("2d");
    //   if (ctx === null) return;
    //   ctx.drawImage(dataUrl);

    //   ctx.filter = "sepia(0.3)";
    //   console.log(ctx, getFilterStyle(filter).slice(8));
    //   document.getElementById("root")?.appendChild(canvas);

    //   const tmp = document.createElement("a");
    //   tmp.download = `${new Date().toJSON().slice(0, 10)}.png`;
    //   tmp.href = canvas.toDataURL();
    //   tmp.target = "_blank";
    //   tmp.click();
    //   tmp.remove();
    // });
    htmlToImage
      .toPng(target)
      .then(function (dataUrl) {
        const tmp = document.createElement("a");
        tmp.download = `${new Date().toJSON().slice(0, 10)}.png`;
        tmp.href = dataUrl;
        tmp.target = "_blank";
        tmp.click();
        tmp.remove();
      })
      .catch(function (error) {
        console.error("Something Went Wrong! - download png");
      });
  };

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
      <ContentContainer style={{ gap: "70px" }}>
        <FrameItem
          id="frame-download"
          text={new Date().toJSON().slice(0, 10)}
          input={true}
        >
          <PhotoItem
            targetFilter={filter}
            cut={cut}
            filter={filter}
            take={take}
            photo={photo}
          />
        </FrameItem>

        <TextButton onClick={onDownload}>
          <Text text="Download 🖼️" size={40} color="red" weight="Light" />
        </TextButton>
      </ContentContainer>

      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Share;

const TextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 14px 25px;
  border-radius: 25px;
  border: 2px solid ${color.red};

  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  transition: all 0.3s;
`;
