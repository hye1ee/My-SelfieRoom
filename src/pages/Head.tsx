import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Text from "../styles/text";
import { HeadTitle } from "../styles/script";
import Footer from "../components/Footer";
import { useResetRecoilState } from "recoil";
import {
  backgroundState,
  cutState,
  frameState,
  photoState,
  takeState,
} from "../state/state";
import PageContainer from "../components/PageContainer";

const Head = () => {
  const navigate = useNavigate();

  // for initialization
  const resetCut = useResetRecoilState(cutState);
  const resetFrame = useResetRecoilState(frameState);
  const resetBackground = useResetRecoilState(backgroundState);
  const resetTake = useResetRecoilState(takeState);
  const resetPhoto = useResetRecoilState(photoState);

  useEffect(() => {
    resetCut();
    resetFrame();
    resetBackground();
    resetTake();
    resetPhoto();
  }, []);

  return (
    <PageContainer>
      <Text text={HeadTitle[0]} weight="SemiBold" size={200} color="red" />
      <Text text={HeadTitle[1]} weight="ExtraLight" size={100} color="yellow" />
      <Text
        text={HeadTitle[2]}
        weight="ExtraLight"
        size={40}
        color="yellow"
        style={{ marginTop: "20px" }}
      />
      <Button text="Start" active={true} onClick={() => navigate("/@")} />
      <Footer
        text="CONTACT"
        color="red"
        onClick={() => window.open("https://www.linkedin.com/in/hye1ee")}
      />
    </PageContainer>
  );
};
export default Head;
