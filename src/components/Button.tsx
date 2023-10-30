import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { motionStyleProps } from "../styles/motion";
import ButtonImg from "../assets/button.svg";

interface ButtonProps {
  active: boolean;
  onClick: () => void;
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonWrapper onClick={props.onClick} {...motionStyleProps.scaleEase}>
      <img
        src={ButtonImg}
        alt="buttonIcon"
        style={{ width: "100%", height: "100%" }}
      />
    </ButtonWrapper>
  );
};
export default Button;

const ButtonWrapper = styled(motion.div)`
  width: 140px;
  height: 140px;

  border-radius: 50%;

  &:hover {
    width: 145px;
    height: 145px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  cursor: pointer;
  transition: all 0.3s;
`;
