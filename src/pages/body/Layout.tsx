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

const Layout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useRecoilState<StepState>(stepState);

  useEffect(() => {
    setStep("cut"); // initialization
  }, []);

  return (
    <>
      {step == "cut" && <Cut onNext={() => setStep("frame")} />}
      {step == "frame" && <Frame onNext={() => setStep("background")} />}
      {step == "background" && <Background onNext={() => setStep("take")} />}
      {step == "take" && <Take onNext={() => setStep("photo")} />}
      {step == "photo" && <Photo onNext={() => setStep("filter")} />}
      {step == "filter" && <Filter onNext={() => setStep("share")} />}
      {step == "share" && <Share onNext={() => navigate("/")} />}
    </>
  );
};
export default Layout;
