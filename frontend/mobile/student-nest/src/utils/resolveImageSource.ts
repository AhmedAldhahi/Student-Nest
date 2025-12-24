export const resolveImageSource = (img: string | number) =>
  typeof img === "string" ? { uri: img } : img;
