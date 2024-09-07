import { Text as NBText } from "native-base";
import React from "react";

// Define the font families based on your custom fonts
const fontFamilies = {
  black: "ProductSans-Black",
  "black-italic": "ProductSans-BlackItalic",
  "bold-italic": "ProductSans-BoldItalic",
  bold: "ProductSans-Bold",
  italic: "ProductSans-Italic",
  light: "ProductSans-Light",
  "light-italic": "ProductSans-LightItalic",
  "medium-italic": "ProductSans-MediumItalic",
  medium: "ProductSans-Medium",
  regular: "ProductSans-Regular",
  thin: "ProductSans-Thin",
  "thin-italic": "ProductSans-ThinItalic",
};

const Cext = ({
  black,
  bold,
  italic,
  light,
  medium,
  thin,
  fontSize,
  style,
  ...props
}) => {
  // Determine the font family based on props
  let fontFamily = fontFamilies.regular; // Default font

  if (bold && italic) {
    fontFamily = fontFamilies["bold-italic"];
  } else if (bold) {
    fontFamily = fontFamilies.bold;
  } else if (black) {
    fontFamily = fontFamilies.black;
  } else if (italic) {
    fontFamily = fontFamilies.italic;
  } else if (light) {
    fontFamily = fontFamilies.light;
  } else if (medium) {
    fontFamily = fontFamilies.medium;
  } else if (thin) {
    fontFamily = fontFamilies.thin;
  }

  // Resolve color if it's a NativeBase color name

  // Combine default and custom styles
  const customStyle = {
    fontFamily: fontFamily,
    fontSize: fontSize || 14, // Default font size
  };

  return <NBText style={[customStyle, style]} {...props} />;
};

export default Cext;
