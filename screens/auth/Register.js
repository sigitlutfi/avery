import { FontAwesome6 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Input,
  ScrollView,
  VStack,
} from "native-base";
import * as React from "react";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import adjustColor from "../../constants/adjustColor";
import { ColorContext } from "../../contexts/ColorContext";
import { ConfigContext } from "../../contexts/ConfigContext";
function Register({ navigation }) {
  const { colors } = React.useContext(ColorContext);
  const { config } = React.useContext(ConfigContext);
  return (
    <Board>
      <ScrollView>
        <Box flex={1}>
          <Box bg={colors.box} mt={"20%"} mx={6} px={4} borderRadius={"xl"}>
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
                Daftar
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
              <Box>
                <Input
                  variant={"filled"}
                  bg={"gray.200"}
                  placeholder="Ulang kata Sandi"
                  borderRadius={"xl"}
                  InputRightElement={
                    <Icon as={FontAwesome6} name="eye" mr={2} />
                  }
                ></Input>
              </Box>
              <Box>
                <Input
                  variant={"filled"}
                  bg={"gray.200"}
                  placeholder="Nomor Handphone"
                  borderRadius={"xl"}
                ></Input>
              </Box>
              <Box>
                <Input
                  variant={"filled"}
                  bg={"gray.200"}
                  placeholder="Email"
                  borderRadius={"xl"}
                ></Input>
              </Box>

              <Button
                bg={colors.primary}
                borderRadius={"xl"}
                borderWidth={2}
                borderColor={colors.primary}
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
                  bg={colors.box}
                  color={adjustColor(colors.textLight, -30)}
                  px={4}
                  bold
                >
                  Atau daftar menggunakan
                </Cext>
              </Box>

              <Button
                bg={"white"}
                borderRadius={"xl"}
                borderWidth={2}
                _text={{ color: "gray.800" }}
                leftIcon={
                  <Icon
                    as={FontAwesome6}
                    name="google"
                    color={colors.primary}
                  />
                }
              >
                Daftar menggunakan Google
              </Button>
              <Cext
                alignSelf={"center"}
                px={4}
                bg={colors.box}
                color={adjustColor(colors.textLight, -30)}
                bold
              >
                Anda sudah punya akun ?
              </Cext>
              <Button
                bg={colors.primary}
                borderRadius={"xl"}
                borderWidth={2}
                borderColor={colors.primary}
                mb={4}
                onPress={() => navigation.navigate("Register")}
              >
                <Cext bold color={"white"}>
                  Login sekarang
                </Cext>
              </Button>
            </VStack>
          </Box>
          <Center mt={19} mb={4} alignSelf={"center"}>
            <Cext fontSize={10}>
              Dengan menggunakan ini anda telah menyetujui{" "}
              <Cext underline color={colors.primary} fontSize={10}>
                PRIVACY POLICY
              </Cext>{" "}
              dari kami.
            </Cext>
            <Cext color={"gray.500"} fontSize={10}>
              Ver. 409011428
            </Cext>
          </Center>
        </Box>
      </ScrollView>
    </Board>
  );
}
export default Register;
