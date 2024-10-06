import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useState } from 'react';

// import { Appearance } from "react-native"; // Comment out the Appearance API
import adjustColor from '../constants/adjustColor'; // Import the adjustColor helper
import { darkcolors, colors as defaultColors } from '../constants/Colors'; // Import the colors constant

export const ColorContext = createContext();

const lightModeColors = {
  bg: '#f4f4f5',
  fg: '#000000',
  textLight: '#000000',
  textGray: '#a1a1aa',
  textDark: '#FFFFFF',
  box: '#FFFFFF',
  ...defaultColors,
};

const darkModeColors = {
  bg: '#121212',
  fg: '#FFFFFF',
  textLight: '#FFFFFF',
  textGray: '#a1a1aa',
  textDark: '#000000',
  box: adjustColor('#121212', 80), // 20% lighter than bg
  ...darkcolors,
};

const amoledModeColors = {
  bg: '#000000',
  fg: '#FFFFFF',
  textLight: '#FFFFFF',
  textGray: '#a1a1aa',
  textDark: '#000000',
  box: '#202020', // 20% lighter than bg
  ...darkcolors,
};

export const ColorPaletteProvider = ({ children }) => {
  const [colors, setColors] = useState(lightModeColors); // Default to light mode initially
  const [mode, setMode] = useState('light'); // Default mode is now "light"

  useEffect(() => {
    const loadColors = async () => {
      const storedColors = await SecureStore.getItemAsync('colorPalette');
      const storedMode = await SecureStore.getItemAsync('colorMode');

      // Commented out the system color scheme logic
      // const systemMode =
      //   Appearance.getColorScheme() === "dark" ? "dark" : "light";
      // console.log("system", systemMode);

      if (storedColors && storedMode) {
        const parsedColors = JSON.parse(storedColors);
        setMode(storedMode);
        setColors({
          ...getModeColors(storedMode),
          ...parsedColors,
        });
      } else {
        await SecureStore.setItemAsync(
          'colorPalette',
          JSON.stringify(lightModeColors)
        );
        await SecureStore.setItemAsync('colorMode', 'light'); // Set to light mode by default
        setColors(getModeColors('light'));
        setMode('light');
      }
    };

    loadColors();
  }, []);

  const getModeColors = (mode) => {
    switch (mode) {
      case 'dark':
        return darkModeColors;
      case 'amoled':
        return amoledModeColors;
      default:
        return lightModeColors;
    }
  };

  const changeMode = async (newMode) => {
    const modeColors = getModeColors(newMode);

    setMode(newMode);

    // Preserve existing custom colors while applying mode colors
    const updatedColors = {
      ...colors,
      ...modeColors,
    };

    setColors(updatedColors);

    await SecureStore.setItemAsync('colorMode', newMode);
    await SecureStore.setItemAsync(
      'colorPalette',
      JSON.stringify(updatedColors)
    );
  };

  const changeColors = async (newColors) => {
    const updatedColors = {
      ...colors,
      ...newColors,
    };
    setColors(updatedColors);
    await SecureStore.setItemAsync(
      'colorPalette',
      JSON.stringify(updatedColors)
    );
  };

  return (
    <ColorContext.Provider value={{ colors, changeColors, changeMode, mode }}>
      {children}
    </ColorContext.Provider>
  );
};
