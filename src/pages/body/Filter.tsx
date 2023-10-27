import React from "react";

import Button from "../../components/Button";
import { BodyProps } from "./type";

const Filter = (props: BodyProps) => {
  return (
    <>
      This is Filter Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Filter;
