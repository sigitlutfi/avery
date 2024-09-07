// src/screens/SettingsScreen.js
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { Box, Pressable, ScrollView, Stack } from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Cext from "../../components/Cext";
import Cutton from "../../components/Cutton";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";

const Setting = () => {
  const { colors, changeColors, mode, changeMode } = useContext(ColorContext);
  const { reOnBoarding } = useContext(AuthContext);
  const [modes, setModes] = useState(mode);

  // const animatedValue = useRef(
  //   new Animated.Value(
  //     modes === "light"
  //       ? 0
  //       : modes === "dark"
  //         ? 0.5
  //         : modes === "amoled"
  //           ? 1
  //           : 0
  //   )
  // ).current;
  const getModeValue = (mode) => {
    switch (mode) {
      case "dark":
        return 0.5;
      case "amoled":
        return 1;
      case "light":
        return 0;
      default:
        return 0;
    }
  };
  const animatedValue = useRef(new Animated.Value(getModeValue(modes))).current;

  // Local state to track the currently selected color palette
  const [selectedPalette, setSelectedPalette] = useState(null);

  const colorPalettes = [
    { primary: "#0171CD", accent: "#FD7F31" },
    { primary: "#89ABE3", accent: "#EA738D" },
    { primary: "#A1BE95", accent: "#F98866" },
    { primary: "#735DA5", accent: "#2AB7CA" },
    { primary: "#20948B", accent: "#6AB187" },
    { primary: "#002C54", accent: "#C5001A" },
  ];

  const handlePalettePress = (palette) => {
    // Update the local state with the selected palette
    setSelectedPalette(palette);

    // Call the context function to update the global color palette
    changeColors(palette);
  };

  const handleSetItem = async () => {
    try {
      await SecureStore.setItemAsync("timeLeft", "21:19");
      alert("Success", "Item has been saved successfully!");
    } catch (error) {
      alert("Error", "Failed to save item.");
    }
  };
  const handleModeChange = (newMode) => {
    changeMode(newMode);
    setModes(newMode);
  };

  const getColorForMode = (mode) => {
    switch (mode) {
      case "dark":
        return "#121212"; // Dark gray for dark mode
      case "amoled":
        return "#000000"; // True black for AMOLED screens
      case "light":
        return "#f4f4f5";
      default:
        return "#f4f4f5"; // White for light mode
    }
  };

  // Animate the background color based on mode change
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: getModeValue(modes),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [modes]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      getColorForMode("light"),
      getColorForMode("dark"),
      getColorForMode("amoled"),
    ],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={getColorForMode(modes)}
        style={modes === "light" ? "dark" : "light"}
      />

      <Animated.View style={{ backgroundColor, flex: 1 }}>
        <Stack space={4} m={4}>
          <Cext>DEBUG MENU</Cext>
          <Cext bold>WARNING ITS EXPERIMENTAL !</Cext>
          <Box>
            <ScrollView horizontal>
              {colorPalettes.map((palette, index) => (
                <Pressable
                  key={index}
                  onPress={() => handlePalettePress(palette)} // Handle the press event
                  style={{ marginHorizontal: 4 }}
                >
                  <LinearGradient
                    colors={[palette.primary, palette.accent]}
                    start={{ x: 1, y: 0.8 }}
                    end={{ x: 0.1, y: 1 }}
                    locations={[0.5, 0.5]}
                    style={styles.gradient}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </Box>
          <Cext>Font Fams</Cext>
          <Cext bold>ProductSans</Cext>
          <Cutton
            full
            title={"Set Timer Countdown user"}
            onPress={() => {
              handleSetItem();
            }}
          ></Cutton>
          <Cutton
            full
            title="Light Mode"
            onPress={() => handleModeChange("light")}
          ></Cutton>
          <Cutton
            full
            title="Dark Mode"
            onPress={() => handleModeChange("dark")}
          ></Cutton>
          <Cutton
            full
            title="Amoled Mode"
            onPress={() => handleModeChange("amoled")}
          ></Cutton>

          <Cutton
            full
            title="Re Onboarding"
            onPress={() => reOnBoarding({ type: "on" })}
          ></Cutton>
        </Stack>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: 80, // Fixed height for ScrollView
  },
  gradient: {
    width: 64, // Adjusted width for better visibility
    height: 64, // Adjusted height for better visibility
    borderRadius: 32, // Adjusted border radius
  },
});

export default Setting;
