import React from "react";

interface ButtonProps {
  active: boolean;
  onClick: () => void;
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button disabled={!props.active} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
export default Button;
