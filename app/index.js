// app/index.js
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
export default function HomePage() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      // Simulate a loading process
      await new Promise((resolve) => setTimeout(resolve, 7000));
      SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World</Text>
      <Link href="/about">About</Link>
    </View>
  );
}
