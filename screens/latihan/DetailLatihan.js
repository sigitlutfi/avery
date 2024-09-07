import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Modal,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";

import LottieView from "lottie-react-native";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import adjustColor from "../../constants/adjustColor";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";
import { useCountdownTimer } from "../../helper/timeHelper";

export default DetailLatihan = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext);
  const { tit } = route.params;
  const { timeLeft } = useCountdownTimer();
  const { colors } = useContext(ColorContext);
  useEffect(() => {
    if (timeLeft === "00:01") {
      navigation.goBack(); // Navigate back when time is 00:01
    }
  }, [timeLeft, navigation]);
  const [jawaban, setJawaban] = useState(null);

  const page = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(true);

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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" bg={colors.primary}>
          <Modal.CloseButton _icon={{ color: "white" }} />

          <Modal.Body>
            <Center>
              <Cext color="white" black fontSize={20} mb={2}>
                {tit}
              </Cext>{" "}
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../../assets/images/exam.json")}
              />
              <Cext color="white" fontSize={16} textAlign="justify">
                Velit commodo ut ipsum voluptate qui eiusmod deserunt
                adipisicing eu Lorem est non tempor. Dolore excepteur aliqua
                fugiat incididunt proident cupidatat enim non sunt. Officia
              </Cext>
              <Cext color="white" mt={12}>
                selamat mengerjakan
              </Cext>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Box>
        <HStack
          p={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          bg={colors.primary}
        >
          <HStack alignItems={"center"}>
            <Pressable pr={3} onPress={() => navigation.goBack()}>
              <Icon
                color={"white"}
                size={8}
                name="chevron-back"
                as={Ionicons}
              />
            </Pressable>

            <Cext
              ml={2}
              bold
              fontSize={16}
              onPress={() => signOut()}
              color={"white"}
            >
              {tit}
            </Cext>
          </HStack>

          <HStack alignSelf={"flex-end"} space={2} m={2}>
            <Pressable>
              <Box bg={"white"} shadow={3} p={2} borderRadius={"md"}>
                <Icon as={Ionicons} name="search" />
              </Box>
            </Pressable>
            <Pressable>
              <Box bg={"white"} shadow={3} p={2} borderRadius={"md"}>
                <Icon as={Ionicons} name="text" />
              </Box>
            </Pressable>
          </HStack>
        </HStack>
      </Box>
      <Box flex={1}>
        <ScrollView>
          <Box px={4}>
            <Stack space={2}>
              <Box
                bg={colors.accent}
                p={1}
                borderRadius={"2xl"}
                w={100}
                alignSelf={"center"}
                mt={4}
              >
                <Cext
                  color={"white"}
                  bold
                  alignSelf={"center"}
                  fontSize={17}
                  borderRadius={"lg"}
                >
                  {timeLeft}
                </Cext>
              </Box>
              <Text alignSelf={"center"} fontSize={10}>
                {counter} second
              </Text>
              <Cext black fontSize={18} textAlign="justify">
                5. Est eu minim ullamco ad nisi dolor ea nostrud laborum fugiat
                aute magna ullamco pariatur.
              </Cext>

              <Cext textAlign={"justify"}>
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
                      ? colors.primary
                      : colors.box
                  }
                  shadow={3}
                  borderRadius={"lg"}
                  onPress={() => handleOptionPress(v)}
                  borderWidth={selectedOptions.includes(v.label) ? 1.8 : 0}
                  borderColor={colors.primary}
                >
                  <HStack alignItems={"center"}>
                    <Cext
                      bold
                      fontSize={22}
                      mr={4}
                      ml={2}
                      color={
                        selectedOptions.includes(v.label)
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
                        selectedOptions.includes(v.label)
                          ? colors.textDark
                          : colors.textLight
                      }
                    >
                      {v.urai}
                    </Cext>
                  </HStack>
                </Pressable>
              ))}
              <HStack flex={1} space={2} mt={4}>
                <Pressable
                  onPress={() => navigation.navigate("Summary")}
                  flex={1}
                >
                  <HStack
                    bg={adjustColor(colors.accent, -15)}
                    alignItems={"center"}
                    justifyContent={"center"}
                    py={2}
                    shadow={3}
                    mb={3}
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
                    shadow={3}
                    mb={3}
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
                  bg={i <= 4 ? colors.primary : colors.box}
                  w={i === 4 ? 12 : 8}
                  h={i === 4 ? 12 : 8}
                  borderRadius={"lg"}
                  borderWidth={i === 4 ? 6 : 1}
                  borderColor={colors.primary}
                >
                  <Cext
                    color={i <= 4 ? colors.textDark : colors.textLight}
                    fontSize={i === 4 ? 16 : 10}
                    bold={i === 4 ? true : false}
                  >
                    {i + 1}
                  </Cext>
                </Center>
              </Pressable>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </Board>
  );
};
