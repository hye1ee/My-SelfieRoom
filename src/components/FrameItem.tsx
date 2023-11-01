import React from "react";

import styled from "styled-components";
import { color, innerShadow } from "../styles/color";

interface FrameItemProps extends FrameTagProps {
  children?: React.ReactNode;
}

const FrameItem = (props: FrameItemProps) => {
  return (
    <FrameItemWrapper>
      <FrameItemContainer>
        {props.children ?? <FrameItemChild />}
      </FrameItemContainer>
      <FrameTag {...props} />
    </FrameItemWrapper>
  );
};
export default FrameItem;

const FrameItemWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  border-radius: 2px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const FrameItemContainer = styled.div`
  width: fit-content;
  height: fit-content;

  box-sizing: border-box;
  padding: 20px;
  background-color: ${color.snowwhite};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrameItemChild = styled.div`
  width: 315px;
  height: 450px;
  flex-shrink: 0;

  background: ${color.lightGray};
  ${innerShadow}
`;

interface FrameTagProps {
  type: "1" | "2" | "3";
  text: string;
  height?: number;
}

const FrameTag = (props: FrameTagProps) => {
  return (
    <FrameTagContainer
      style={{ height: `${props.height ?? 100}px` }}
    ></FrameTagContainer>
  );
};

const FrameTagContainer = styled.div`
  width: 100%;

  position: relative;
  background-color: ${color.white};
`;

const FrameTagWrapper = styled.div`
  position: absolute;
`;
