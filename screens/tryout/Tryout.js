import { Center, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

const Tryout = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Center flex={1}>
        <Text>tryout</Text>
      </Center>
    </SafeAreaView>
  );
};

export default Tryout;
