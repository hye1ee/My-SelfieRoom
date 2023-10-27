import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

const Head = () => {
  const navigate = useNavigate();

  return (
    <>
      Hi this is head
      <Button text="Start" active={true} onClick={() => navigate("/@")} />
    </>
  );
};
export default Head;
