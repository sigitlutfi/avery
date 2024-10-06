import { StatusBar } from 'expo-status-bar';
import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ColorContext } from '../contexts/ColorContext';

const Board = ({ children, style, statusBarColor, statusBarStyle }) => {
  const { colors } = useContext(ColorContext);
  const adjustedBackgroundColor = useMemo(
    () => (statusBarColor ? statusBarColor : colors.primary),
    [colors.primary, statusBarColor]
  );
  const sbmode = useMemo(
    () => (statusBarStyle ? statusBarStyle : 'dark'),
    [statusBarStyle]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.bg }, style]}
    >
      {/* Status Bar */}
      <StatusBar
        backgroundColor={adjustedBackgroundColor}
        style={sbmode === 'light' ? 'dark' : 'light'}
      />

      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Board;
