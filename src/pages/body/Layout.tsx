import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";

import { stepState } from "../../state/state";
import { StepState } from "../../state/type";

import Cut from "./Cut";
import Background from "./Background";
import Frame from "./Frame";
import Take from "./Take";
import Photo from "./Photo";
import Filter from "./Filter";
import Share from "./Share";
import styled from "styled-components";
import { bodyTitle } from "../../styles/script";
import Text from "../../styles/text";
import Footer from "../../components/Footer";
import { getColor } from "./utils";
import PageContainer from "../../components/PageContainer";

const Layout = () => {
  const [step, setStep] = useRecoilState<StepState>(stepState);
  const navigate = useNavigate();

  useEffect(() => {
    setStep("cut"); // initialization
  }, []);

  return (
    <PageContainer>
      <BodyTitle step={step} />
      <BodyContent />
      <Footer
        text="MY SELFIEROOM"
        onClick={() => navigate("/")}
        color={getColor(step)}
      />
    </PageContainer>
  );
};
export default Layout;

const BodyTitle = ({ step }: { step: StepState }) => {
  const title = bodyTitle[step];
  const color = getColor(step);

  return (
    <BodyTitleWrapper>
      <Text text={title[0]} size={90} weight="ExtraLight" color={color} />
      <Text text={"\u00a0" + title[1]} size={90} weight="Light" color={color} />
      <Text
        text={"\u00a0" + title[2]}
        size={90}
        weight="ExtraLight"
        color={color}
      />
    </BodyTitleWrapper>
  );
};

const BodyTitleWrapper = styled.div`
  height: fit-content;
  width: fit-content;
  max-width: 100%;

  margin-top: 30px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BodyContent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useRecoilState<StepState>(stepState);

  return (
    <>
      {step == "cut" && <Cut onNext={() => setStep("frame")} />}
      {step == "frame" && <Frame onNext={() => setStep("background")} />}
      {step == "background" && <Background onNext={() => setStep("take")} />}
      {step == "take" && <Take onNext={() => setStep("photo")} />}
      {step == "photo" && <Photo onNext={() => setStep("share")} />}
      {/* {step == "filter" && <Filter onNext={() => setStep("share")} />} */}
      {step == "share" && <Share onNext={() => navigate("/")} />}
    </>
  );
};
