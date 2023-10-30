import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Text from "../styles/text";
import { HeadTitle } from "../styles/script";
import styled from "styled-components";
import Footer from "../components/Footer";

const Head = () => {
  const navigate = useNavigate();

  return (
    <HeadContainer>
      <Text text={HeadTitle[0]} weight="SemiBold" size={200} color="red" />
      <Text text={HeadTitle[1]} weight="ExtraLight" size={100} color="yellow" />
      <Text text={HeadTitle[2]} weight="ExtraLight" size={40} color="yellow" />
      <Button text="Start" active={true} onClick={() => navigate("/@")} />
      <Footer
        text="CONTACT"
        color="red"
        onClick={() => window.open("https://www.linkedin.com/in/hayes-lee/")}
      />
    </HeadContainer>
  );
};
export default Head;

const HeadContainer = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;
