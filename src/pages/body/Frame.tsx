import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";

const Frame = (props: BodyProps) => {
  return (
    <>
      This is Frame Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Frame;
