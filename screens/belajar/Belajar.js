import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  FlatList,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import React, { useContext } from "react";
import { Dimensions } from "react-native";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Header from "../../components/Header";

import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";

const Belajar = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const w80 = (Dimensions.get("screen").width / 100) * 80;
  const { colors } = useContext(ColorContext);

  return (
    <Board>
      <Header />
      <ScrollView>
        <Box
          flexDir={"row"}
          flex={1}
          m={4}
          px={2}
          py={1}
          borderRadius={"2xl"}
          alignItems={"center"}
          bg={colors.box}
        >
          <Input
            flex={1}
            mr={2}
            placeholder="Cari..."
            variant={"unstyled"}
            color={colors.textLight}
          />
          <Pressable p={2} bg={colors.accent} borderRadius={"full"}>
            <Icon name="search" as={Ionicons} color={"white"} />
          </Pressable>
        </Box>

        <Box p={4}>
          <Cext bold fontSize={22} mb={2}>
            Kategori 1
          </Cext>
          <FlatList
            data={[
              {
                kategori: "SubKategori 1",
                detail:
                  "Culpa do adipisicing eiusmod nulla dolor nostrud non adipisicing minim commodo cupidatat Lorem labore. Aliqua adipisicing nulla ea laborum mollit irure incididunt velit. Aliquip veniam eu deserunt exercitation in minim est ut laborum officia consectetur nulla occaecat. Labore commodo nisi reprehenderit nostrud est ea nisi.",
                open: false,
              },
              {
                kategori: "SubKategori 1",
                detail:
                  "Nulla aliquip voluptate nulla sunt veniam esse nulla dolore ut nostrud nisi occaecat adipisicing. Aliquip sint laborum ut mollit Lorem cillum esse quis dolor commodo ad cillum eu sint. Enim duis commodo laborum cillum eu. Mollit laborum laboris nulla incididunt duis nisi Lorem. Mollit officia nostrud eiusmod velit sunt eiusmod enim id est excepteur sunt aliqua exercitation. Aliqua ea laboris quis aliquip ex nisi ad exercitation adipisicing eiusmod ex eiusmod in.",
                open: true,
              },
              {
                kategori: "SubKategori 1",
                detail:
                  "Do proident ipsum sunt consectetur duis. Aliqua eu laboris adipisicing adipisicing pariatur ullamco fugiat. Eu magna dolore consectetur ut mollit irure.",
                open: true,
              },
            ]}
            renderItem={({ item, index }) => (
              <Pressable
                key={index}
                onPress={() =>
                  item.open
                    ? navigation.navigate("SubKategoriBelajar", { item })
                    : alert("Packet Locked")
                }
              >
                <HStack
                  justifyContent={"space-between"}
                  key={index}
                  p={4}
                  borderRadius={"2xl"}
                  alignItems={"center"}
                  bg={colors.box}
                  mb={3}
                  flex={1}
                >
                  <HStack alignItems={"center"} flex={1}>
                    <Icon
                      as={Ionicons}
                      name="document-text"
                      color={colors.primary}
                      size={10}
                    />
                    <Stack ml={2} flexShrink={1}>
                      <Cext bold>{item.kategori}</Cext>
                      <Cext noOfLines={2} mr={2}>
                        {item.detail}
                      </Cext>
                    </Stack>
                  </HStack>

                  <Icon
                    as={Ionicons}
                    color={item.open ? colors.orange : "gray.500"}
                    name={item.open ? "chevron-forward" : "lock-closed-outline"}
                  />
                </HStack>
              </Pressable>
            )}
          />
        </Box>
        <Box p={4}>
          <Cext bold fontSize={22} mb={2}>
            Kategori 2
          </Cext>
          <FlatList
            data={[
              {
                kategori: "SubKategori 2",
                detail:
                  "Culpa do adipisicing eiusmod nulla dolor nostrud non adipisicing minim commodo cupidatat Lorem labore. Aliqua adipisicing nulla ea laborum mollit irure incididunt velit. Aliquip veniam eu deserunt exercitation in minim est ut laborum officia consectetur nulla occaecat. Labore commodo nisi reprehenderit nostrud est ea nisi.",
                open: false,
              },
              {
                kategori: "SubKategori 2",
                detail:
                  "Nulla aliquip voluptate nulla sunt veniam esse nulla dolore ut nostrud nisi occaecat adipisicing. Aliquip sint laborum ut mollit Lorem cillum esse quis dolor commodo ad cillum eu sint. Enim duis commodo laborum cillum eu. Mollit laborum laboris nulla incididunt duis nisi Lorem. Mollit officia nostrud eiusmod velit sunt eiusmod enim id est excepteur sunt aliqua exercitation. Aliqua ea laboris quis aliquip ex nisi ad exercitation adipisicing eiusmod ex eiusmod in.",
                open: true,
              },
              {
                kategori: "SubKategori 2",
                detail:
                  "Do proident ipsum sunt consectetur duis. Aliqua eu laboris adipisicing adipisicing pariatur ullamco fugiat. Eu magna dolore consectetur ut mollit irure.",
                open: true,
              },
              {
                kategori: "SubKategori 2",
                detail:
                  "Do proident ipsum sunt consectetur duis. Aliqua eu laboris adipisicing adipisicing pariatur ullamco fugiat. Eu magna dolore consectetur ut mollit irure.",
                open: false,
              },
              {
                kategori: "SubKategori 2",
                detail:
                  "Do proident ipsum sunt consectetur duis. Aliqua eu laboris adipisicing adipisicing pariatur ullamco fugiat. Eu magna dolore consectetur ut mollit irure.",
                open: true,
              },
            ]}
            renderItem={({ item, index }) => (
              <HStack
                justifyContent={"space-between"}
                key={index}
                p={4}
                borderRadius={"2xl"}
                alignItems={"center"}
                bg={colors.box}
                mb={3}
                flex={1}
              >
                <HStack alignItems={"center"} flex={1}>
                  <Icon
                    as={Ionicons}
                    name="document-text"
                    color={colors.primary}
                    size={10}
                  />
                  <Stack ml={2} flexShrink={1}>
                    <Cext bold>{item.kategori}</Cext>
                    <Cext noOfLines={2} mr={2}>
                      {item.detail}
                    </Cext>
                  </Stack>
                </HStack>

                <Icon
                  as={Ionicons}
                  color={item.open ? colors.orange : "gray.500"}
                  name={item.open ? "chevron-forward" : "lock-closed-outline"}
                />
              </HStack>
            )}
          />
        </Box>
      </ScrollView>
    </Board>
  );
};

export default Belajar;
