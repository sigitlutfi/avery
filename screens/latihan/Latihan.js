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
import Header from "../../components/Header";
import { ColorContext } from "../../contexts/ColorContext";

const Latihan = ({ navigation }) => {
  const { colors } = useContext(ColorContext);

  return (
    <Board>
      <Header />
      <Box flex={1}>
        <ScrollView>
          <Box>
            <Cext mb={2} black fontSize={18} m={4}>
              Progress Latihan
            </Cext>
            <FlatList
              data={[
                {
                  name: "Latihan soal 1",
                  detail:
                    "Culpa do adipisicing eiusmod nulla dolor nostrud non adipisicing minim commodo cupidatat Lorem labore. Aliqua adipisicing nulla ea laborum mollit irure incididunt velit. Aliquip veniam eu deserunt exercitation in minim est ut laborum officia consectetur nulla occaecat. Labore commodo nisi reprehenderit nostrud est ea nisi.",
                  progress: "0/10",
                },
                {
                  name: "Latihan soal 2",
                  detail:
                    "Nulla aliquip voluptate nulla sunt veniam esse nulla dolore ut nostrud nisi occaecat adipisicing. Aliquip sint laborum ut mollit Lorem cillum esse quis dolor commodo ad cillum eu sint. Enim duis commodo laborum cillum eu. Mollit laborum laboris nulla incididunt duis nisi Lorem. Mollit officia nostrud eiusmod velit sunt eiusmod enim id est excepteur sunt aliqua exercitation. Aliqua ea laboris quis aliquip ex nisi ad exercitation adipisicing eiusmod ex eiusmod in.",
                  progress: "0/10",
                },
                {
                  name: "Latihan Soal 3",
                  detail:
                    "Do proident ipsum sunt consectetur duis. Aliqua eu laboris adipisicing adipisicing pariatur ullamco fugiat. Eu magna dolore consectetur ut mollit irure.",
                  progress: "0/10",
                },
              ]}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate("Preexam", { tit: item.name });
                  }}
                >
                  <HStack
                    justifyContent={"space-between"}
                    key={index}
                    p={4}
                    mx={4}
                    borderRadius={"2xl"}
                    alignItems={"center"}
                    bg={colors.box}
                    shadow={3}
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

                    <Box bg={colors.accent} p={1} borderRadius={"md"}>
                      <Cext bold color="white" fontSize={10}>
                        {item.progress}
                      </Cext>
                    </Box>
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
export default Latihan;
