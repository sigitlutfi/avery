import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const Splash = ({ onTimeout }) => {
  useEffect(() => {
    // Set a timeout for 3 seconds
    const timer = setTimeout(() => {
      onTimeout();
    }, 3000); // 3-second delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onTimeout]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
