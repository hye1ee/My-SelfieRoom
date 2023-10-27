import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";

const Photo = (props: BodyProps) => {
  return (
    <>
      This is Photo Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Photo;
