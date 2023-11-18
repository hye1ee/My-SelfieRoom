export type Font = "Aclon" | "Bad" | "Pat" | "Gochi" | "Pop" | "Cutive";

export const getFont = (font: Font) => {
  switch (font) {
    case ("Aclon"):
      return `'Aclonica', sans-serif`;
    case ("Bad"):
      return `'Bad Script', cursive`;
    case ("Pat"):
      return `'Patrick Hand SC', cursive`;
    case ("Gochi"):
      return `'Gochi Hand', cursive`;
    case ("Cutive"):
      return `'Cutive Mono', monospace`;
    case ("Pop"):
      return `'Poppins', sans-serif`;
  }
}

