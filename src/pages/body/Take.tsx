import React, { useRef } from "react";
import Webcam from "react-webcam";

import Button from "../../components/Button";
import { BodyProps } from "./type";

const Take = (props: BodyProps) => {
  return (
    <>
      This is Take Step
      <Webcam mirrored={true} />
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Take;
