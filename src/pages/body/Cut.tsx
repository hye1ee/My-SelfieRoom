import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";
import styled from "styled-components";
import { color } from "../../styles/color";
import SelectMark from "../../components/SelectMark";

const Cut = (props: BodyProps) => {
  return (
    <>
      <CutWrapper>
        <CutContainer>
          <CutSquare />
        </CutContainer>
        <CutContainer>
          <SelectMark />
          <CutHori />
          <CutHori />
          <CutHori />
        </CutContainer>
        <CutContainer>
          <CutVer />
          <CutVer />
          <CutVer />
          <CutVer />
        </CutContainer>
      </CutWrapper>

      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Cut;

const CutWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  gap: 100px;

  justify-content: center;
  align-items: center;
`;

const CutContainer = styled.div`
  max-width: 315px;
  width: fit-content;
  height: fit-content;

  position: relative;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
`;

const CutSquare = styled.div`
  width: 250px;
  height: 250px;
  background-color: ${color.whiteGray};

  flex: 0 0 auto;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2) inset;
`;

const CutHori = styled.div`
  width: 315px;
  height: 157px;
  background-color: ${color.whiteGray};

  flex: 0 0 auto;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2) inset;
`;

const CutVer = styled.div`
  width: 150px;
  height: 200px;
  background-color: ${color.whiteGray};

  flex: 0 0 auto;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2) inset;
`;
