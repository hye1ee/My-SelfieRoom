import { atom } from "recoil";
import { BackgroundState, CutState, FilterState, FrameState, PhotoState, StepState, TakeState } from "./type";

export const stepState = atom<StepState>({
  key: "stepState",
  default: "cut",
});

export const cutState = atom<CutState | null>({
  key: "cutState",
  default: null,
});
export const frameState = atom<FrameState | null>({
  key: "frameState",
  default: null,
});
export const backgroundState = atom<BackgroundState | null>({
  key: "backgroundState",
  default: null,
});

export const takeState = atom<TakeState | null>({
  key: "takeState",
  default: null,
});
export const photoState = atom<PhotoState | null>({
  key: "photoState",
  default: null,
});
export const filterState = atom<FilterState>({ key: "filterState", default: "Today" });