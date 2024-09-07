import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";

import Board from "../../components/Board";
import Cext from "../../components/Cext";
import adjustColor from "../../constants/adjustColor";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";
import { replaceWithNestedStack } from "../../helper/replaceAndClearStack";
import { useCountdownTimer } from "../../helper/timeHelper";

export default KunciJawaban = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext);

  const { timeLeft } = useCountdownTimer();
  const { colors } = useContext(ColorContext);
  useEffect(() => {
    if (timeLeft === "00:01") {
      navigation.goBack(); // Navigate back when time is 00:01
    }
  }, [timeLeft, navigation]);
  const [jawaban, setJawaban] = useState(null);

  const page = [
    { salah: true },
    { salah: true },
    {},
    {},
    { salah: true },
    {},
    {},
    {},
    {},
    { salah: true },
  ];

  const options = [
    {
      label: "A",
      urai: "Deserunt dolore aliqua dolore exercitation incididunt duis esse anim adipisicing.",
    },
    {
      label: "B",
      urai: "Commodo et ullamco ipsum dolore non dolor velit nulla laborum.",
    },
    {
      label: "C",
      urai: "Officia ad nostrud velit minim est ex velit nulla velit consequat.",
    },
    { label: "D", urai: "Qui cupidatat ad deserunt incididunt." },
    {
      label: "E",
      urai: "Minim magna laborum non duis esse nisi excepteur labore non quis eiusmod fugiat.",
    },
  ];
  // Store the selected options as an array
  const [selectedOptions, setSelectedOptions] = useState(["B"]);

  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option.label)) {
      // If the option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((o) => o !== option.label));
    } else if (selectedOptions.length < 2) {
      // If less than two options are selected, add the new option
      setSelectedOptions([...selectedOptions, option.label]);
    } else {
      // Optional: Display an alert or notification when the limit is reached
      alert("You can only select up to two options.");
    }
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Function to increment the counter
    const incrementCounter = () => {
      setCounter((prevCounter) => prevCounter + 1);
    };

    // Set up a timer to call incrementCounter every second
    const intervalId = setInterval(incrementCounter, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Board>
      <Box>
        <HStack
          p={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          bg={colors.primary}
        >
          <HStack alignItems={"center"}>
            <Pressable
              pr={3}
              onPress={() =>
                replaceWithNestedStack(
                  navigation,
                  "HomeStack",
                  "StackLatihan",
                  { someParam: "value" }
                )
              }
            >
              <Icon color={"white"} size={8} name="close" as={Ionicons} />
            </Pressable>

            <Cext
              ml={2}
              bold
              fontSize={18}
              onPress={() => signOut()}
              color={"white"}
            >
              Kunci Jawaban
            </Cext>
          </HStack>
        </HStack>
      </Box>
      <Box flex={1}>
        <ScrollView>
          <Box p={4}>
            <Stack space={2}>
              <Cext black fontSize={18}>
                5. Est eu minim ullamco ad nisi dolor ea nostrud laborum fugiat
                aute magna ullamco pariatur.
              </Cext>

              <Cext textAlign={"justify"} fontSize={16}>
                Aute ullamco aliqua mollit proident irure exercitation.Labore
                deserunt cupidatat ea id ut ad laborum laborum ipsum cillum elit
                aliquip reprehenderit excepteur.
              </Cext>
              <Divider />

              {options.map((v, i) => (
                <Pressable
                  key={i}
                  p={2}
                  bg={
                    selectedOptions.includes(v.label)
                      ? colors.red
                      : i == 2
                      ? colors.lime
                      : colors.box
                  }
                  shadow={3}
                  borderRadius={"lg"}
                  onPress={() => handleOptionPress(v)}
                >
                  <HStack alignItems={"center"}>
                    <Cext
                      bold
                      fontSize={22}
                      mr={4}
                      ml={2}
                      color={
                        selectedOptions.includes(v.label) || i == 2
                          ? colors.textDark
                          : colors.textLight
                      }
                    >
                      {v.label}
                    </Cext>
                    <Cext
                      flexShrink={1}
                      flexWrap={"wrap"}
                      color={
                        selectedOptions.includes(v.label) || i == 2
                          ? colors.textDark
                          : colors.textLight
                      }
                    >
                      {v.urai}
                    </Cext>
                  </HStack>
                </Pressable>
              ))}

              <Box mt={4}>
                <Cext mb={2} black>
                  Penjelasan
                </Cext>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/220px-Koala_climbing_tree.jpg",
                  }}
                  alt=""
                  width={"full"}
                  resizeMode="cover"
                  height={300}
                  mb={2}
                  borderRadius={"xl"}
                />
                <Cext textAlign="justify">
                  Eiusmod fugiat voluptate elit consectetur non ea veniam
                  laboris qui. Nulla quis id tempor ut deserunt labore aute
                  adipisicing Lorem eiusmod esse. Cupidatat mollit velit cillum
                  ipsum. Nulla sint exercitation excepteur adipisicing do
                  laborum adipisicing deserunt culpa dolore cillum officia nisi
                  est.
                </Cext>
              </Box>
              <HStack space={2}>
                <Pressable
                  onPress={() => navigation.navigate("Summary")}
                  flex={1}
                >
                  <HStack
                    bg={adjustColor(colors.accent, -15)}
                    alignItems={"center"}
                    justifyContent={"center"}
                    py={2}
                    borderRadius={"lg"}
                  >
                    <Icon
                      mr={2}
                      as={Ionicons}
                      name="arrow-back-circle"
                      color={"white"}
                    />
                    <Cext color={"white"}>Sebelumnya</Cext>
                  </HStack>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("Summary")}
                  flex={1}
                >
                  <HStack
                    bg={colors.accent}
                    alignItems={"center"}
                    justifyContent={"center"}
                    py={2}
                    borderRadius={"lg"}
                  >
                    <Cext color={"white"}>Berikutnya</Cext>
                    <Icon
                      ml={2}
                      as={Ionicons}
                      name="arrow-forward-circle"
                      color={"white"}
                    />
                  </HStack>
                </Pressable>
              </HStack>
            </Stack>
          </Box>
        </ScrollView>
        <Box
          bg={colors.box}
          p={2}
          borderTopWidth={3}
          borderColor={colors.primary}
          borderTopRadius={6}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{ alignItems: "center" }}
          >
            {page.map((v, i) => (
              <Pressable key={i} mr={2}>
                <Center
                  bg={v.salah ? colors.red : colors.lime}
                  w={i === 4 ? 10 : 8}
                  h={i === 4 ? 10 : 8}
                  borderRadius={"lg"}
                >
                  <Text
                    color={colors.textDark}
                    fontSize={i === 4 ? 16 : 10}
                    bold
                  >
                    {i + 1}
                  </Text>
                </Center>
              </Pressable>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </Board>
  );
};
