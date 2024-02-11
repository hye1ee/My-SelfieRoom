import React, { useState } from "react";

import styled from "styled-components";
import { color, innerShadow, outerShadow } from "../styles/color";
import { getFont } from "../styles/font";
import Text from "../styles/text";
import { FrameState } from "../state/type";
import { useRecoilValue } from "recoil";
import { frameState } from "../state/state";

interface FrameItemProps extends FrameTagProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const FrameItem = (props: FrameItemProps) => {
  return (
    <FrameItemWrapper style={props.style} id={props.id}>
      <FrameItemContainer>
        {props.children ?? <FrameItemChild />}
      </FrameItemContainer>
      {props.input ? <FrameTagInput {...props} /> : <FrameTag {...props} />}
    </FrameItemWrapper>
  );
};
export default FrameItem;

const FrameItemWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  border-radius: 4px;
  overflow: hidden;
  flex: 0 0 auto;

  display: flex;
  flex-direction: column;
  background-color: ${color.snowwhite};
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

interface FrameTagProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: FrameState;
  text: string;
  input: boolean;
  height?: number;
}

export const getFrameStyle = (type: FrameState): React.CSSProperties => {
  switch (type) {
    case 1:
      return {
        fontFamily: getFont("Cutive"),
        fontSize: "22px",
        position: "absolute",
        right: "20px",
        top: "30px",
      };
    case 2:
      return {
        fontFamily: getFont("Bad"),
        fontSize: "45px",
        position: "absolute",
        left: "25px",
      };
    case 3:
      return {
        fontFamily: getFont("Pat"),
        fontSize: "40px",
        position: "absolute",
        right: "15px",
        bottom: "18px",
      };
  }
};

export const getFrameInputStyle = (type: FrameState): React.CSSProperties => {
  switch (type) {
    case 1:
      return {
        fontFamily: getFont("Cutive"),
        fontSize: "22px",
        position: "absolute",
        right: "20px",
        top: "30px",
        textAlign: "right",
      };
    case 2:
      return {
        fontFamily: getFont("Bad"),
        fontSize: "45px",
        position: "absolute",
        left: "25px",
      };
    case 3:
      return {
        fontFamily: getFont("Pat"),
        fontSize: "40px",
        position: "absolute",
        right: "15px",
        bottom: "18px",
        textAlign: "right",
      };
  }
};

const FrameTag = (props: FrameTagProps) => {
  const frame = useRecoilValue(frameState);
  const type = props.type ?? frame ?? 3;

  return (
    <FrameTagContainer style={{ height: `${props.height ?? 100}px` }}>
      <Text
        text={(type === 1 ? "# " : "") + props.text}
        color="black"
        size={0}
        weight="Regular"
        style={getFrameStyle(type)}
      />
    </FrameTagContainer>
  );
};

const FrameTagContainer = styled.div`
  width: 100%;

  position: relative;
  background-color: ${color.white};
  box-sizing: border-box;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  ${outerShadow}
`;

const FrameTagInput = (props: FrameTagProps) => {
  const [text, setText] = useState<string>(props.text);
  const frame = useRecoilValue(frameState);

  return (
    <FrameTagContainer style={{ height: `${props.height ?? 100}px` }}>
      <FrameTagInputContainer
        value={text}
        onChange={(el) => setText(el.target.value)}
        style={getFrameInputStyle(frame ?? 3)}
      />
    </FrameTagContainer>
  );
};

const FrameTagInputContainer = styled.input`
  width: 85%;
  border: none;
  background-color: transparent;
  color: ${color.black};

  &:focus {
    outline: none;
  }
`;
