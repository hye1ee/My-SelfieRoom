import React from "react";
import Text from "../styles/text";
import styled from "styled-components";
import { color } from "../styles/color";

const SelectMark = () => {
  return (
    <SelectMarkContainer>
      <Text
        text="SELECTED🎟️"
        size={55}
        weight="Regular"
        styled={true}
        color="red"
      />
    </SelectMarkContainer>
  );
};
export default SelectMark;

const SelectMarkContainer = styled.div`
  width: 390px;
  height: 78px;

  position: absolute;
  top: 50%;
  left: 50%;

  box-sizing: border-box;
  padding-top: 7px;
  border-radius: 20px;
  opacity: 80%;
  transform: translate(-50%, -50%) rotate(-6deg);
  background-color: ${color.pink};

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
