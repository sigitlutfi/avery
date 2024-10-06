// src/screens/SettingsScreen.js
import * as SecureStore from 'expo-secure-store';
import { Box, Pressable, ScrollView, Stack, Toast } from 'native-base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Cext from '../../components/Cext';
import Cutton from '../../components/Cutton';
import Headering from '../../components/Headering';
import { AuthContext } from '../../contexts/AuthContext';
import { ColorContext } from '../../contexts/ColorContext';
import { ConfigContext } from '../../contexts/ConfigContext';

const Setting = () => {
  const { colors, changeColors, mode, changeMode } = useContext(ColorContext);
  const { reOnBoarding } = useContext(AuthContext);
  const { fontFamily, changeFontFamily, debug, toggleDebug } =
    useContext(ConfigContext);
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
      case 'dark':
        return 0.5;
      case 'amoled':
        return 1;
      case 'light':
        return 0;
      default:
        return 0;
    }
  };
  const animatedValue = useRef(new Animated.Value(getModeValue(modes))).current;

  // Local state to track the currently selected color palette

  const colorPalettes = [
    { primary: '#1585d4', secondary: '#64B5F6', accent: '#FF6B3E' }, // Light blue with a soft red-orange accent (slightly darker)
    { primary: '#66BB6A', secondary: '#81C784', accent: '#E6A700' }, // Fresh green with a golden accent (darker yellow)
    { primary: '#EC407A', secondary: '#F06292', accent: '#E57373' }, // Bright pink with a coral accent (darker coral)
    { primary: '#AB47BC', secondary: '#BA68C8', accent: '#FBC02D' }, // Vibrant purple with a rich yellow accent
    { primary: '#29B6F6', secondary: '#4FC3F7', accent: '#F4511E' }, // Sky blue with a darker warm orange
    { primary: '#FF7043', secondary: '#FF8A65', accent: '#689F38' }, // Soft orange with a deeper green accent
    { primary: '#FFA726', secondary: '#FFB74D', accent: '#0288D1' }, // Warm orange with a stronger blue accent
    { primary: '#26C6DA', secondary: '#4DD0E1', accent: '#E91E63' }, // Light teal with a darker playful pink
    { primary: '#7986CB', secondary: '#9FA8DA', accent: '#FB8C00' }, // Muted indigo with a deeper orange accent
    { primary: '#FFD54F', secondary: '#FFE082', accent: '#3949AB' }, // Bright yellow with a darker indigo accent
  ];

  const handlePalettePress = (palette) => {
    // Update the local state with the selected palette

    // Call the context function to update the global color palette
    Toast.show({ title: 'Ganti', backgroundColor: palette.primary });
    changeColors(palette);
  };

  const handleSetItem = async () => {
    try {
      await SecureStore.setItemAsync('timeLeft', '21:19');
      alert('Success', 'Item has been saved successfully!');
    } catch (error) {
      alert('Error', 'Failed to save item.', error);
    }
  };
  const handleModeChange = (newMode) => {
    changeMode(newMode);
    setModes(newMode);
  };

  const getColorForMode = (mode) => {
    switch (mode) {
      case 'dark':
        return '#121212'; // Dark gray for dark mode
      case 'amoled':
        return '#000000'; // True black for AMOLED screens
      case 'light':
        return '#f4f4f5';
      default:
        return '#f4f4f5'; // White for light mode
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
      getColorForMode('light'),
      getColorForMode('dark'),
      getColorForMode('amoled'),
    ],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Headering tit={'Setting (experimental !)'} />

      <Animated.View
        style={{
          backgroundColor,
          flex: 1,
          marginTop: -24,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
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
                  <Stack
                    space={1}
                    borderRadius={'lg'}
                    p={2}
                    borderWidth={1}
                    borderColor={colors.accent}
                  >
                    <Box bg={palette.primary} w={6} h={6} />
                    <Box bg={palette.secondary} w={6} h={6} />
                    <Box bg={palette.accent} w={6} h={6} />
                  </Stack>
                </Pressable>
              ))}
            </ScrollView>
          </Box>
          <Cext>Font Fams</Cext>
          {fontFamily.map((v, i) => (
            <Cext
              key={i}
              bold
              fontFamily={v.fam + '-Bold'}
              onPress={() => changeFontFamily(v.fam)}
              color={v.active ? colors.primary : colors.textLight}
            >
              {v.fam}
            </Cext>
          ))}
          <Cutton
            full
            title={'Set Timer Countdown user'}
            onPress={() => {
              handleSetItem();
            }}
          ></Cutton>
          <Cutton
            full
            title="Light Mode"
            onPress={() => handleModeChange('light')}
          ></Cutton>
          <Cutton
            full
            title="Dark Mode"
            onPress={() => handleModeChange('dark')}
          ></Cutton>
          <Cutton
            full
            title="Amoled Mode"
            onPress={() => handleModeChange('amoled')}
          ></Cutton>

          <Cutton
            full
            title="Re Onboarding"
            onPress={() => reOnBoarding({ type: 'on' })}
          ></Cutton>
          <Cutton
            full
            title="Re debug"
            onPress={() => toggleDebug(!debug)}
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
