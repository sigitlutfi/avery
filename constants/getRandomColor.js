// src/utils/getRandomColor.js
import { colors } from "./Colors";

export const getRandomColor = () => {
  const colorKeys = Object.keys(colors);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return colors[randomKey];
};
