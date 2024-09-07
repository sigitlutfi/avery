import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import React, { useContext } from "react";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Headering from "../../components/Headering";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";

export default SubKategori = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext);
  const { item } = route.params;
  const { colors } = useContext(ColorContext);

  return (
    <Board>
      <Headering tit="MATERI BELAJAR" />
      <Box flex={1}>
        <ScrollView>
          <Box p={4}>
            <Cext mb={2} bold fontSize={16}>
              {item.kategori}
            </Cext>
            <FlatList
              data={[
                {
                  name: "Materi tipe 1",
                  detail:
                    "Culpa do adipisicing eiusmod nulla dolor nostrud non adipisicing minim commodo cupidatat Lorem labore. Aliqua adipisicing nulla ea laborum mollit irure incididunt velit. Aliquip veniam eu deserunt exercitation in minim est ut laborum officia consectetur nulla occaecat. Labore commodo nisi reprehenderit nostrud est ea nisi.",
                  open: false,
                },
                {
                  name: "Materi tipe 2",
                  detail:
                    "Nulla aliquip voluptate nulla sunt veniam esse nulla dolore ut nostrud nisi occaecat adipisicing. Aliquip sint laborum ut mollit Lorem cillum esse quis dolor commodo ad cillum eu sint. Enim duis commodo laborum cillum eu. Mollit laborum laboris nulla incididunt duis nisi Lorem. Mollit officia nostrud eiusmod velit sunt eiusmod enim id est excepteur sunt aliqua exercitation. Aliqua ea laboris quis aliquip ex nisi ad exercitation adipisicing eiusmod ex eiusmod in.",
                  open: true,
                },
                {
                  name: "Materi tipe 3",
                  detail:
                    "Do proident ipsum sunt consectetur duis. Aliqua eu laboris adipisicing adipisicing pariatur ullamco fugiat. Eu magna dolore consectetur ut mollit irure.",
                  open: true,
                },
              ]}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    item.open
                      ? navigation.navigate("DetailBelajar")
                      : alert("package locked");
                  }}
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
                        <Cext bold>{item.name}</Cext>
                      </Stack>
                    </HStack>

                    <Icon
                      as={Ionicons}
                      color={item.open ? colors.accent : "gray.500"}
                      name={
                        item.open ? "chevron-forward" : "lock-closed-outline"
                      }
                    />
                  </HStack>
                </Pressable>
              )}
            />
          </Box>
        </ScrollView>
      </Box>
    </Board>
  );
};
