import { Text as NBText } from "native-base";
import React, { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext"; // Import the ColorContext
import { ConfigContext } from "../contexts/ConfigContext";

const Cext = ({
  black,
  bold,
  italic,
  light,
  medium,
  thin,

  color, // Allow overriding the text color
  style,
  ...props
}) => {
  const { colors } = useContext(ColorContext);
  const { fonts } = useContext(ConfigContext); // Mengambil fonts dari context

  // Tentukan font family berdasarkan props
  let fontFamily = fonts.regular; // Default font

  // Cek kombinasi bold & italic di luar switch case
  if (bold && italic) {
    fontFamily = fonts["bold-italic"];
  } else {
    // Menggunakan switch-case untuk menentukan font
    switch (true) {
      case black:
        fontFamily = fonts.black;
        break;
      case bold:
        fontFamily = fonts.bold;
        break;
      case italic:
        fontFamily = fonts.italic;
        break;
      case light:
        fontFamily = fonts.light;
        break;
      case medium:
        fontFamily = fonts.medium;
        break;
      case thin:
        fontFamily = fonts.thin;
        break;
      default:
        fontFamily = fonts.regular;
    }
  }
  // Resolve the color using the theme or the context

  const resolvedColor = color || colors.textLight;
  // Combine default and custom styles

  return (
    <NBText {...props} style={[{ fontFamily }, style]} color={resolvedColor} />
  );
};

export default Cext;
