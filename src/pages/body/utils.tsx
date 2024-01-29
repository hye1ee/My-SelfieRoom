import { BackgroundState, CutState, StepState } from "../../state/type";

export const getRedEmoji = (idx?: number) => {
  const emoji = ["🍒", "🍎", "💌", "🍷", "🎒", "🌹", "🍫"];
  return emoji[idx ?? Math.floor(Math.random() * emoji.length)];
};

export const getColor = (step: StepState): "red" | "yellow" => {
  return step == "take" || step == "photo" || step == "share"
    ? "red"
    : "yellow";
};

export const getPhotoCuts = (cut: CutState | null): number => {
  switch (cut) {
    case "one":
      return 1;
    case "three":
      return 3;
    case "four":
      return 4;
    default:
      return 1;
  }
};

export const getPhotoSizeStyle = (cut: CutState | null): string => {
  switch (cut) {
    case "one":
      return "width: 500px; height: 500px;";
    case "three":
      return "width: 330px; height: 180px;";
    case "four":
      return "width: 240px; height: 280px;";
    default:
      return "width: 500px; height: 500px;";
  }
};

export const getBackgroundName = (
  background: BackgroundState | null
): string | null => {
  switch (background) {
    case 1:
      return "mercury.png";
    case 2:
      return "neptune.png";
    case 3:
      return null;
    case 4:
      return "saturn.png";
    case 5:
      return "uranus.png";
    default:
      return null;
  }
};
