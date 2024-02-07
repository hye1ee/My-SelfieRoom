import React from "react";
import styled from "styled-components";
import { CutState, FilterState, PhotoState, TakeState } from "../state/type";
import { getFilterStyle, getPhotoSizeStyle } from "../pages/body/utils";
import OriginImg from "../assets/background/origin.png";

interface PhotoItemProps {
  cut: CutState;
  targetFilter: FilterState;
  filter: FilterState;
  take: TakeState;
  photo: PhotoState;
  onClick?: () => void;
}

const PhotoItem = (props: PhotoItemProps) => {
  return (
    <PhotoItemContainer
      onClick={props.onClick}
      clickable={props.onClick !== (null || undefined)}
    >
      {props.filter === props.targetFilter ? (
        <PhotoWrapper>
          {Array.from(props.photo).map((idx) => (
            <PhotoContainer key={idx} size={getPhotoSizeStyle(props.cut)}>
              <PhotoCanvas
                src={props.take?.[idx]}
                portrait={Array.from(props.photo).length % 2 === 0}
                filter={props.filter}
              />
            </PhotoContainer>
          ))}
        </PhotoWrapper>
      ) : (
        <PhotoDummy src={OriginImg} />
      )}
    </PhotoItemContainer>
  );
};
export default PhotoItem;

const PhotoItemContainer = styled.div<{ clickable: boolean }>`
  width: fit-content;
  height: fit-content;

  ${(props) =>
    props.clickable &&
    `&:hover {
      filter: brightness(0.8);
      opacity: 0.7;
    }
    cursor: pointer;
    transition: all 0.3s;`}
`;

const PhotoDummy = styled.img`
  width: 200px;
`;

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
