import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import ContentContainer from "../../components/ContentContainer";
import FrameItem from "../../components/FrameItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { cutState, photoState, takeState } from "../../state/state";
import styled from "styled-components";
import { getPhotoCuts, getRedEmoji } from "./utils";
import SelectContainer from "../../components/SelectContainer";

const Photo = (props: BodyProps) => {
  const take = useRecoilValue(takeState);
  const cut = getPhotoCuts(useRecoilValue(cutState));
  const [photo, setPhoto] = useRecoilState(photoState);

  return (
    <>
      <ContentContainer style={{ gap: "20px" }}>
        {take?.map((url, idx) => (
          <SelectContainer
            key={idx}
            select={false}
            onClick={() =>
              setPhoto((prev) => {
                const newPhoto = new Set(prev);
                if (newPhoto?.has(idx)) newPhoto.delete(idx);
                else if (newPhoto?.size < cut) newPhoto?.add(idx);
                return newPhoto;
              })
            }
            style={{ transform: photo?.has(idx) ? "rotate(2deg)" : "" }}
          >
            <FrameItem
              key={idx}
              text={photo?.has(idx) ? "Selected!" + getRedEmoji(idx) : ""}
              input={false}
            >
              <PhotoCanvas src={url} />
            </FrameItem>
          </SelectContainer>
        ))}
      </ContentContainer>
      {photo?.size === cut && (
        <Button text="Next" active={true} onClick={props.onNext} />
      )}
    </>
  );
};
export default Photo;

const PhotoCanvas = styled.img`
  width: 17vw;
`;
