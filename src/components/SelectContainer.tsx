import React from "react";
import styled from "styled-components";
import SelectMark from "./SelectMark";

interface SelectContainerProps {
  select: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}

const SelectContainer = (props: SelectContainerProps) => {
  return (
    <SelectContainerWrapper
      onClick={props.onClick}
      style={{ ...(props.style ?? {}) }}
    >
      {props.select && <SelectMark />}
      <div style={{}}></div>
      {props.children}
    </SelectContainerWrapper>
  );
};
export default SelectContainer;

const SelectContainerWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 80%;
  }
  transition: all 0.2s;
`;
