import React from "react";

import styled from "styled-components";
import { color, innerShadow } from "../styles/color";
import { getFont } from "../styles/font";
import Text from "../styles/text";

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
  type: FrameType;
  text: string;
  height?: number;
}

type FrameType = "1" | "2" | "3";

const getFrameStyle = (type: FrameType): React.CSSProperties => {
  switch (type) {
    case "1":
      return {
        fontFamily: getFont("Cutive"),
        fontSize: "22px",
        position: "absolute",
        right: "20px",
        top: "30px",
      };
    case "2":
      return {
        fontFamily: getFont("Bad"),
        fontSize: "45px",
        position: "absolute",
        left: "25px",
      };
    case "3":
      return {
        fontFamily: getFont("Gochi"),
        fontSize: "36px",
        position: "absolute",
        right: "15px",
        bottom: "18px",
      };
  }
};

const FrameTag = (props: FrameTagProps) => {
  return (
    <FrameTagContainer style={{ height: `${props.height ?? 100}px` }}>
      <Text
        text={(props.type === "1" ? "# " : "") + props.text}
        color="black"
        size={0}
        weight="Regular"
        style={getFrameStyle(props.type)}
      />
    </FrameTagContainer>
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
