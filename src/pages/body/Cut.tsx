import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { BodyProps } from "./type";
import { cutState } from "../../state/state";

import SelectContainer from "../../components/SelectContainer";
import Button from "../../components/Button";
import { color, innerShadow } from "../../styles/color";
import ContentContainer from "../../components/ContentContainer";

const Cut = (props: BodyProps) => {
  const [cut, setCut] = useRecoilState(cutState);

  return (
    <>
      <ContentContainer style={{ gap: "100px" }}>
        <SelectContainer
          onClick={() => {
            setCut("one");
          }}
          select={cut === "one"}
        >
          <CutContainer>
            <CutSquare />
          </CutContainer>
        </SelectContainer>

        <SelectContainer
          onClick={() => {
            setCut("three");
          }}
          select={cut === "three"}
        >
          <CutContainer>
            <CutHori />
            <CutHori />
            <CutHori />
          </CutContainer>
        </SelectContainer>
        <SelectContainer
          onClick={() => {
            setCut("four");
          }}
          select={cut === "four"}
        >
          <CutContainer>
            <CutVer />
            <CutVer />
            <CutVer />
            <CutVer />
          </CutContainer>
        </SelectContainer>
      </ContentContainer>
      {cut !== null && (
        <Button text="Next" active={true} onClick={props.onNext} />
      )}
    </>
  );
};
export default Cut;

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
  width: 315px;
  height: 315px;
  background-color: ${color.lightGray};

  flex: 0 0 auto;
  ${innerShadow}
`;

const CutHori = styled.div`
  width: 315px;
  height: 157px;
  background-color: ${color.lightGray};

  flex: 0 0 auto;
  ${innerShadow}
`;

const CutVer = styled.div`
  width: 150px;
  height: 200px;
  background-color: ${color.lightGray};

  flex: 0 0 auto;
  ${innerShadow}
`;
