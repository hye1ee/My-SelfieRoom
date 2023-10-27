import { atom } from "recoil";
import { StepState } from "./type";

export const stepState = atom<StepState>({
  key: "stepState",
  default: "cut",
});
