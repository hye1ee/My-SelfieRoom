import React from "react";
import styled from "styled-components";

interface ContentContainerProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ContentContainer = (props: ContentContainerProps) => {
  return (
    <ContentContainerWrapper style={{ ...props.style }}>
      {props.children}
    </ContentContainerWrapper>
  );
};
export default ContentContainer;

const ContentContainerWrapper = styled.div`
  width: 100%;
  height: fit-content;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -48%);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
