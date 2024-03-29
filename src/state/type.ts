export type StepState =
  | "cut"
  | "frame"
  | "background"
  | "take"
  | "photo"
  | "filter"
  | "share";

export type CutState = "one" | "three" | "four";
export type FrameState = 1 | 2 | 3;
export type BackgroundState = 1 | 2 | 3 | 4 | 5;

export type TakeState = string[];
export type PhotoState = Set<number>;
export type FilterState = "Once Upon a Time" | "Long Ago" | "Yesterday" | "Today";
export type DownloadState = string;