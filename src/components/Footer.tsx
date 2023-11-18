import React from "react";
import styled from "styled-components";
import Text from "../styles/text";

interface FooterProps {
  onClick: () => void;
  text: string;
  color: "red" | "yellow";
}

const Footer = (props: FooterProps) => {
  return (
    <FooterContainer onClick={props.onClick}>
      <Text text={props.text} weight="Light" size={20} color={props.color} />
    </FooterContainer>
  );
};
export default Footer;

const FooterContainer = styled.div`
  width: fit-content;
  height: fit-content;

  position: absolute;
  transform: translate(-50%, 0);

  left: 50%;
  bottom: 25px;

  cursor: pointer;
`;
