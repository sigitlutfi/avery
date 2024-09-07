import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorContext } from "../contexts/ColorContext"; // Adjust the path as needed

const Board = ({ children, style }) => {
  const { colors, mode } = useContext(ColorContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.bg }, style]}
    >
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
