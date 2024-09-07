import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React, { useContext } from "react";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Headering from "../../components/Headering";
import adjustColor from "../../constants/adjustColor";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";

const Profile = ({ navigation, route }) => {
  const { authState, signOut } = useContext(AuthContext);
  const { userData } = authState;
  const { colors } = useContext(ColorContext);
  return (
    <Board>
      <Headering
        tit={"PROFILE"}
        gray
        right={
          <Pressable px={2} onPress={() => navigation.navigate("Setting")}>
            <Icon
              as={Ionicons}
              name="settings-outline"
              size={8}
              color={"white"}
            />
          </Pressable>
        }
      />

      <ScrollView>
        <Stack alignItems={"center"} space={1} mt={8}>
          <Box
            alignItems={"center"}
            position={"relative"}
            justifyContent={"center"}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={[colors.primary, colors.green]}
              start={{ x: 1, y: 0.8 }}
              end={{ x: 0.1, y: 1 }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
            <Image
              position={"absolute"}
              source={{
                uri: userData.pic,
              }}
              alt=""
              borderRadius={"full"}
              style={{ width: 110, height: 110, borderRadius: 55 }}
            />
            <LinearGradient
              // Background Linear Gradient

              colors={[colors.primary, colors.green]}
              start={{ x: 1, y: 0.8 }}
              end={{ x: 0.1, y: 1 }}
              style={{
                width: 96,
                height: 32,
                borderRadius: 60,
                position: "absolute",
                bottom: -16,
              }}
            >
              <Center flex={1}>
                <Text color={"white"} bold>
                  Akun PRO
                </Text>
              </Center>
            </LinearGradient>
          </Box>
          <Cext bold fontSize={16} mt={6}>
            {userData.nama}
          </Cext>
          <HStack alignItems="center" space={2} mt={2}>
            <Cext fontSize={14}>{userData.email}</Cext>
            <Icon as={Ionicons} name="checkmark-circle" color={colors.green} />
          </HStack>
          <HStack alignItems="center" space={2}>
            <Cext fontSize={14} textAlign="center">
              {userData.nohp}
            </Cext>
            <Pressable bg={colors.primary} px={3} py={1} borderRadius="full">
              <Cext bold fontSize={8} color={"white"}>
                Verifikasi
              </Cext>
            </Pressable>
          </HStack>
          <Cext
            textDecorationLine={"underline"}
            bold
            color={adjustColor(colors.textLight, -20)}
            onPress={() => navigation.navigate("EditProfile")}
          >
            Selengkapnya
          </Cext>
          <Pressable
            px={8}
            py={2}
            borderWidth={1}
            borderColor={colors.red}
            borderRadius={"full"}
            mt={6}
            onPress={() => signOut()}
          >
            <HStack alignItems={"center"}>
              <Icon as={Ionicons} name="log-out" color={"red.600"} mr={2} />
              <Cext bold color={colors.red} fontSize={12}>
                KELUAR
              </Cext>
            </HStack>
          </Pressable>
        </Stack>
        <Box p={4}>
          <Cext black fontSize={18}>
            Paket
          </Cext>
          <Center py={12} bg={colors.box} mt={2} borderRadius={"2xl"}>
            <Cext mb={2}>Belum ada paket aktif</Cext>
            <Pressable onPress={() => navigation.replace("Keranjang")}>
              <HStack
                p={2}
                bg={colors.pink}
                borderRadius={"full"}
                alignItems={"center"}
                space={2}
              >
                <Icon
                  color={"white"}
                  as={Ionicons}
                  name="add-circle"
                  size={8}
                />
                <Cext bold color={"white"}>
                  MULAI LANGGANAN
                </Cext>
              </HStack>
            </Pressable>
          </Center>
        </Box>
        <Box p={4}>
          <Cext black fontSize={18}>
            Histori
          </Cext>
          <ScrollView horizontal mt={2}>
            <Center bg={"blue.600"} p={4} borderRadius={"2xl"}>
              <Icon color={"white"} size={12} as={Ionicons} name="document" />
              <Cext color={"white"} black fontSize={20}>
                Soal Dortm
              </Cext>
              <Cext bold color={"white"}>
                08/10
              </Cext>
              <Cext color={"white"} width={24} numberOfLines={2} mt={2}>
                Amet irure nisi voluptate et anim ex id ea eu laborum minim.
              </Cext>
            </Center>
            <Center bg={colors.green} p={4} borderRadius={"2xl"} ml={4}>
              <Icon color={"white"} size={12} as={Ionicons} name="document" />
              <Cext color={"white"} black fontSize={20}>
                Soal Leusa
              </Cext>
              <Cext bold color={"white"}>
                08/10
              </Cext>
              <Cext color={"white"} width={24} numberOfLines={2} mt={2}>
                Amet irure nisi voluptate et anim ex id ea eu laborum minim.
              </Cext>
            </Center>
            <Center bg={"orange.600"} p={4} borderRadius={"2xl"} ml={4}>
              <Icon color={"white"} size={12} as={Ionicons} name="document" />
              <Cext color={"white"} black fontSize={20}>
                Soal Fuzi
              </Cext>
              <Cext bold color={"white"}>
                08/10
              </Cext>
              <Cext color={"white"} width={24} numberOfLines={2} mt={2}>
                Amet irure nisi voluptate et anim ex id ea eu laborum minim.
              </Cext>
            </Center>
          </ScrollView>
        </Box>
      </ScrollView>
    </Board>
  );
};

export default Profile;
