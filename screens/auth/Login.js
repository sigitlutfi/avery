import * as React from "react";

import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Box, Button, Center, Icon, Image, Input, VStack } from "native-base";
import { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import adjustColor from "../../constants/adjustColor";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";
import { ConfigContext } from "../../contexts/ConfigContext";

// Define HomeScreen component
function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const { colors } = useContext(ColorContext);
  const { config } = useContext(ConfigContext);
  const handleLogin = () => {
    console.log("Attempting to sign in with:", { username, password });
    signIn({
      data: {
        nama: "Sintiya Aulia Nur Khofifah",
        nohp: "+62 87738997969",
        email: "sintiya.nur@gmail.com",
        pic: "https://randomuser.me/api/portraits/women/8.jpg",
      },
      token: "dummy-token",
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor={colors.bg} />
      <Board>
        <Box flex={1}>
          <Box bg={colors.box} mt={"40%"} mx={6} px={4} borderRadius={"xl"}>
            <VStack space={4}>
              <Center h={120} w={240} alignSelf={"center"} mt={-60}>
                <Image
                  source={{ uri: config.icon }}
                  size={"full"}
                  resizeMode="contain"
                  alt=""
                />
              </Center>
              <Cext fontSize={16} bold>
                Masuk
              </Cext>
              <Box>
                <Input
                  variant={"filled"}
                  bg={"gray.200"}
                  placeholder="Akun Pengguna"
                  borderRadius={"xl"}
                ></Input>
              </Box>
              <Box>
                <Input
                  variant={"filled"}
                  bg={"gray.200"}
                  placeholder="Kata Sandi"
                  borderRadius={"xl"}
                  InputRightElement={
                    <Icon as={FontAwesome6} name="eye" mr={2} />
                  }
                ></Input>
              </Box>
              <Cext
                color={colors.primary}
                bold
                fontSize={11}
                alignSelf={"flex-end"}
              >
                Lupa kata sandi
              </Cext>
              <Button
                bg={colors.primary}
                borderRadius={"xl"}
                borderWidth={2}
                borderColor={colors.primary}
                onPress={handleLogin}
              >
                <Cext bold color={"white"}>
                  Masuk
                </Cext>
              </Button>
              <Box>
                <Box h={0.5} bg={"gray.400"} borderRadius={"2xl"} />
                <Cext
                  position={"absolute"}
                  top={-12}
                  alignSelf={"center"}
                  px={4}
                  bg={colors.box}
                  color={adjustColor(colors.textLight, -30)}
                  bold
                >
                  Atau masuk menggunakan
                </Cext>
              </Box>

              <Button
                bg={colors.lime}
                borderRadius={"xl"}
                _text={{ color: "white" }}
                leftIcon={
                  <Icon as={FontAwesome6} name="google" color={"white"} />
                }
              >
                Masuk menggunakan Google
              </Button>
              <Cext
                alignSelf={"center"}
                bg={colors.box}
                px={4}
                bold
                color={adjustColor(colors.textLight, -30)}
              >
                Anda belum punya akun ?
              </Cext>
              <Button
                borderRadius={"xl"}
                variant={"outline"}
                borderWidth={2}
                borderColor={colors.accent}
                mb={4}
                onPress={() => navigation.navigate("Register")}
              >
                <Cext bold color={colors.accent}>
                  Buat akun sekarang
                </Cext>
              </Button>
            </VStack>
          </Box>
          <Center position={"absolute"} bottom={4} alignSelf={"center"}>
            <Cext fontSize={10}>
              Dengan menggunakan ini anda telah menyetujui{" "}
              <Cext
                underline
                color={colors.primary}
                fontSize={10}
                onPress={() => alert("open privacy")}
              >
                PRIVACY POLICY
              </Cext>{" "}
              dari kami.
            </Cext>
            <Cext color={"gray.500"} fontSize={10}>
              Ver. 409011428
            </Cext>
          </Center>
        </Box>
      </Board>
    </KeyboardAvoidingView>
  );
}
export default Login;
