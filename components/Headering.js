import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Icon, Pressable } from "native-base";
import React, { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext";
import Cext from "./Cext";

const Headering = ({ tit, right, gray }) => {
  const navigation = useNavigation();
  const { colors } = useContext(ColorContext);
  const title = tit ? tit : "";

  return (
    <Box bg={colors.primary}>
      <Box p={4} bg={colors.primary}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"}>
            <Pressable pr={2} onPress={() => navigation.goBack()}>
              <Icon
                as={Ionicons}
                name="chevron-back"
                color={"white"}
                size={7}
              />
            </Pressable>
            <Cext bold fontSize={20} color="white">
              {title}
            </Cext>
          </HStack>
          {right ? right : <Box height={4} width={12} />}
        </HStack>
      </Box>
      <Box h={6} bg={colors.bg} w={"full"} borderTopRadius={"2xl"}></Box>
    </Box>
  );
};

export default Headering;
