import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import React, { useContext } from "react";
import { Checkbox } from "react-native-paper";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Headering from "../../components/Headering";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";

export default EditProfile = ({ navigation, route }) => {
  const { authState, signOut } = useContext(AuthContext);
  const { userData } = authState;
  const { colors } = useContext(ColorContext);
  return (
    <Board>
      <Headering
        tit={"EDIT PROFILE"}
        right={
          <Pressable ml={-4} onPress={() => navigation.navigate("Setting")}>
            <Center bg={colors.accent} px={2} py={1} borderRadius={"full"}>
              <Cext fontSize={12} bold color="white">
                Simpan
              </Cext>
            </Center>
          </Pressable>
        }
      />

      <ScrollView>
        <Stack>
          <HStack space={3} mx={4} mt={4} alignItems={"center"}>
            <Box position={"relative"}>
              <LinearGradient
                // Background Linear Gradient
                colors={[colors.primary, colors.green]}
                start={{ x: 1, y: 0.8 }}
                end={{ x: 0.1, y: 1 }}
                style={{
                  width: 120,
                  height: 120,

                  borderRadius: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: userData.pic,
                  }}
                  alt=""
                  borderRadius={"full"}
                  style={{ width: 110, height: 110, borderRadius: 55 }}
                />
              </LinearGradient>
            </Box>
            <Stack space={1}>
              <Cext black fontSize={18}>
                Update Foto Profil
              </Cext>
              <Cext color="gray.400">Ukuran maks. 2 MB</Cext>
              <HStack space={2} alignItems={"center"}>
                <Button
                  size={"xs"}
                  h={8}
                  bg={colors.green}
                  leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" />}
                >
                  <Cext fontSize={12} color="white" mt={-0.5}>
                    Unggah
                  </Cext>
                </Button>
                <Cext bold color={colors.red}>
                  Hapus Foto Profil
                </Cext>
              </HStack>
            </Stack>
          </HStack>
          <Stack space={2} p={4}>
            <Cext bold>Nama Lengkap</Cext>
            <Box bg={"gray.100"} borderRadius={"xl"} mt={1} mb={3}>
              <Input variant={"unstyled"} value={userData.nama} />
            </Box>

            <Cext bold>Nomor Telepon</Cext>
            <Box bg={"gray.100"} borderRadius={"xl"} mt={1} mb={1}>
              <Input variant={"unstyled"} value={userData.nohp} />
            </Box>
            <HStack alignItems={"center"} mb={3}>
              <Checkbox status="checked" color={colors.green} />
              <Cext>Dapat dihubungi melalui WhatsApp</Cext>
            </HStack>

            <Cext bold>Email</Cext>
            <HStack
              bg={"gray.100"}
              borderRadius={"xl"}
              mt={1}
              mb={3}
              pr={2}
              alignItems={"center"}
            >
              <Input variant={"unstyled"} value={userData.email} flex={1} />
              <Icon as={Ionicons} name="checkmark-done" color="gren.300" />
            </HStack>

            <Button bg={colors.box} borderRadius={"xl"}>
              <Cext bold color="white">
                Ganti Password
              </Cext>
            </Button>
            <Button variant={"ghost"} borderRadius={"xl"} mt={8}>
              <Cext bold color={colors.red}>
                Hapus Akun
              </Cext>
            </Button>
          </Stack>
        </Stack>
      </ScrollView>
    </Board>
  );
};
