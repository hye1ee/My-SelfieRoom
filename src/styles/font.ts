export type Font = "Aclon" | "Bad" | "Edu" | "Gochi" | "Pop";

export const getFont = (font: Font) => {
  switch (font) {
    case ("Aclon"):
      return `'Aclonica', sans-serif`;
    case ("Bad"):
      return `'Bad Script', cursive`;
    case ("Edu"):
      return `'Edu TAS Beginner', cursive`;
    case ("Gochi"):
      return `'Gochi Hand', cursive`;
    case ("Pop"):
      return `'Poppins', sans-serif`;
  }
}

