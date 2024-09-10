import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  Stack,
  Text,
} from "native-base";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ColorContext } from "../contexts/ColorContext";
import singkatnama from "../helper/singkatnama";
import Cext from "./Cext";

const Header = () => {
  const { authState } = useContext(AuthContext);
  const { colors } = useContext(ColorContext);
  const navigation = useNavigation();

  return (
    <Box shadow={5} bg={"white"}>
      <HStack
        p={4}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={colors.primary}
      >
        <HStack alignItems={"center"}>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/8.jpg",
              }}
              alt=""
              borderRadius={"full"}
              size={"sm"}
            />
          </Pressable>
          <Stack ml={2}>
            <Cext color={"white"} fontSize={16}>
              Hi,
            </Cext>
            <Cext color={"white"} fontSize={16} bold>
              {singkatnama(authState.userData.nama)}
            </Cext>
          </Stack>
        </HStack>
        <HStack alignItems={"center"} space={2}>
          <Pressable onPress={() => navigation.navigate("Help")}>
            <Icon
              name="alert-circle-outline"
              as={Ionicons}
              size={7}
              color={"white"}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Notification")}>
            <Center
              position={"absolute"}
              top={0}
              right={-4}
              w={17}
              h={17}
              bg={"red.500"}
              borderRadius={"full"}
              zIndex={4}
            >
              <Text color={"white"} bold fontSize={8}>
                24
              </Text>
            </Center>
            <Icon
              name="notifications-outline"
              as={Ionicons}
              size={7}
              color={"white"}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Keranjang")}>
            <Icon name="cart-outline" as={Ionicons} size={7} color={"white"} />
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
