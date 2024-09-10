import { FontAwesome6 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Center, HStack, Icon, Stack } from "native-base";
import React, { useContext, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Cext from "../components/Cext";
import Cutton from "../components/Cutton";
import { ColorContext } from "../contexts/ColorContext";

const Preexam = ({ navigation, route }) => {
  const { tit } = route.params;
  const { colors } = useContext(ColorContext);
  const pagerRef = useRef(null); // Create a ref for the PagerView
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const goToNextPage = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(currentPage + 1); // Navigate to the next page
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary, flex: 1 }}>
      <PagerView
        style={{ flex: 1 }}
        ref={pagerRef}
        initialPage={0}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        <Center flex={1} key={1}>
          <Cext color="white" black fontSize={20} mb={2}>
            {tit}
          </Cext>
          <LottieView
            autoPlay
            style={{
              width: 200,
              height: 200,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../assets/images/exam.json")}
          />
          <Cext color="white" fontSize={16} textAlign="justify" mx={4}>
            Velit commodo ut ipsum voluptate qui eiusmod deserunt adipisicing eu
            Lorem est non tempor. Dolore excepteur aliqua fugiat incididunt
            proident cupidatat enim non sunt. Officia
          </Cext>
          <Cutton
            mt={12}
            bg={colors.accent}
            title="Selanjutnya"
            onPress={goToNextPage}
          />
        </Center>
        <Stack
          flex={1}
          key={2}
          p={4}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Cext color="white" black fontSize={20} mb={4}>
            PERHATIAN
          </Cext>

          <Stack space={4}>
            <HStack space={4} mx={8} alignItems={"center"}>
              <Icon
                as={FontAwesome6}
                color={"white"}
                name="phone-slash"
                size={10}
              />
              <Cext color={"white"} flexShrink={1}>
                Dolore nisi labore elit cupidatat est cupidatat est tempor sint
                tempor enim laborum proident. Irure sint esse sunt ut minim.
              </Cext>
            </HStack>
            <HStack space={4} mx={8} alignItems={"center"}>
              <Icon as={FontAwesome6} color={"white"} name="signal" size={10} />
              <Cext color={"white"} flexShrink={1}>
                Ea sit esse aute amet excepteur dolor ea amet aute commodo.
              </Cext>
            </HStack>
            <HStack space={4} mx={8} alignItems={"center"}>
              <Icon
                as={FontAwesome6}
                color={"white"}
                name="envelope"
                size={10}
              />
              <Cext color={"white"} flexShrink={1}>
                Cupidatat aliquip deserunt sint voluptate qui.
              </Cext>
            </HStack>
            <HStack space={4} mx={8} alignItems={"center"}>
              <Icon
                as={FontAwesome6}
                color={"white"}
                name="clock-rotate-left"
                size={10}
              />
              <Cext color={"white"} flexShrink={1}>
                Magna anim consectetur culpa id do ex laborum minim do
                incididunt fugiat velit.
              </Cext>
            </HStack>
          </Stack>
          <Cutton
            mt={12}
            bg={colors.accent}
            title="Ok. Mulai"
            onPress={() => navigation.replace("DetailLatihan", { tit: tit })}
          />
        </Stack>
      </PagerView>
    </SafeAreaView>
  );
};

export default Preexam;
