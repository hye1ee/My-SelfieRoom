import React from "react";
import { color } from "./color";

interface TextProps {
  text: string;
  size: number;
  color: keyof typeof color;
  weight: TextWeight;
  styled?: boolean;
}

type TextWeight =
  | "Thin"
  | "ExtraLight"
  | "Light"
  | "Regular"
  | "Medium"
  | "SemiBold"
  | "Bold"
  | "ExtraBold";

const Text = (props: TextProps) => {
  return (
    <div
      style={{
        fontFamily: props.styled ?? false ? "Aclonica" : "Poppins",
        fontWeight: getTextWeight(props.weight),
        color: color[props.color],
        fontSize: `${props.size}px`,
        lineHeight: 1,
      }}
    >
      {props.text}
    </div>
  );
};
export default Text;

const getTextWeight = (weight: TextWeight) => {
  switch (weight) {
    case "Thin":
      return 100;
    case "ExtraLight":
      return 200;
    case "Light":
      return 300;
    case "Regular":
      return 400;
    case "Medium":
      return 500;
    case "SemiBold":
      return 600;
    case "Bold":
      return 700;
    case "ExtraBold":
      return 800;
    default:
      return 200;
  }
};
