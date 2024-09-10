// src/screens/SettingsScreen.js
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { Box, Pressable, ScrollView, Stack, Toast } from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Cext from "../../components/Cext";
import Cutton from "../../components/Cutton";
import Headering from "../../components/Headering";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";
import { ConfigContext } from "../../contexts/ConfigContext";

const Setting = () => {
  const { colors, changeColors, mode, changeMode } = useContext(ColorContext);
  const { reOnBoarding } = useContext(AuthContext);
  const { fontFamily, changeFontFamily } = useContext(ConfigContext);
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

  const colorPalettes = [
    { primary: "#006BB6", accent: "#FF7F50" },
    { primary: "#1E3A8A", accent: "#F59E0B" }, // Deep blue with a vibrant yellow
    { primary: "#4F46E5", accent: "#EC4899" }, // Cool blue with a bright pink
    { primary: "#10B981", accent: "#FBBF24" }, // Fresh green with a warm yellow
    { primary: "#6366F1", accent: "#F472B6" }, // Soft blue with a soft pink
    { primary: "#3B82F6", accent: "#F97316" }, // Bright blue with a bold orange
    { primary: "#34D399", accent: "#FF67A0" }, // Mint green with a playful pink
  ];

  const handlePalettePress = (palette) => {
    // Update the local state with the selected palette
    console.log("aw");
    // Call the context function to update the global color palette
    Toast.show({ title: "Ganti", backgroundColor: palette.primary });
    changeColors(palette);
  };

  const handleSetItem = async () => {
    try {
      await SecureStore.setItemAsync("timeLeft", "21:19");
      alert("Success", "Item has been saved successfully!");
    } catch (error) {
      alert("Error", "Failed to save item.", error);
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
  }, [animatedValue, modes]);

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
      <Headering tit={"Setting (experimental !)"} />

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
          {fontFamily.map((v, i) => (
            <Cext
              key={i}
              bold
              fontFamily={v.fam + "-Bold"}
              onPress={() => changeFontFamily(v.fam)}
              color={v.active ? colors.primary : colors.textLight}
            >
              {v.fam}
            </Cext>
          ))}
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
