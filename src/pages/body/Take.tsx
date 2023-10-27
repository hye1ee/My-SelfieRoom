import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";

const Take = (props: BodyProps) => {
  return (
    <>
      This is Take Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Take;
