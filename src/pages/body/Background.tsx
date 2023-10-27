import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";

const Background = (props: BodyProps) => {
  return (
    <>
      This is Background Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Background;
