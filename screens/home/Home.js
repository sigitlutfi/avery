import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Icon,
  Image,
  Modal,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Stack,
  StatusBar,
  Text,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Cutton from "../../components/Cutton";
import Cwipper from "../../components/Cwipper";
import Header from "../../components/Header";
import { getRandomColor } from "../../constants/getRandomColor";
import { ColorContext } from "../../contexts/ColorContext";
import useHttpHelper from "../../helper/httpHelp";
import formatRupiah from "../../helper/rupiah";

const Home = ({ navigation }) => {
  const { GET } = useHttpHelper();

  const { colors } = useContext(ColorContext);
  //const w80 = (Dimensions.get("screen").width / 100) * 80;
  const blue = colors.primary;
  const oren = colors.accent;
  const [mopen, setMopen] = useState(true);

  useEffect(() => {
    //fetchData();
    return () => {
      // Cleanup code (if needed)
    };
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const data = await GET("/berita");
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Failed to fetch data:", error);
  //   }
  // };
  return (
    <NativeBaseProvider>
      <Modal isOpen={mopen} onClose={() => setMopen(false)}>
        <Modal.Content bg={colors.primary} alignItems={"center"}>
          <Image
            borderRadius={"lg"}
            size={"2xl"}
            m={4}
            alt=""
            source={{
              uri: "https://png.pngtree.com/png-clipart/20230621/original/pngtree-special-promo-banner-design-for-sale-and-offer-vector-png-image_9193515.png",
            }}
          />
          <Pressable onPress={() => setMopen(false)}>
            <Icon as={Ionicons} name="close" color={"white"} size={8} my={4} />
          </Pressable>
        </Modal.Content>
      </Modal>
      <StatusBar bg="indigo.600" />
      <Board>
        <Header />

        <ScrollView>
          <Cwipper autoplay={true} interval={3000} loop={true}>
            <Pressable
              flex={1}
              bg={"gray.400"}
              overflow={"hidden"}
              m={4}
              onPress={() => alert("action")}
              borderRadius={"2xl"}
            >
              <Pressable position={"absolute"} right={0} bottom={0}>
                <Box
                  bg={colors.accent}
                  px={4}
                  py={1}
                  borderTopLeftRadius={"xl"}
                >
                  <Cext bold color="white" fontSize={12}>
                    Selengkapnya
                  </Cext>
                </Box>
              </Pressable>
            </Pressable>
            <Pressable
              flex={1}
              bg={"gray.400"}
              overflow={"hidden"}
              m={4}
              onPress={() => alert("action")}
              borderRadius={"2xl"}
            >
              <Pressable
                position={"absolute"}
                right={0}
                bottom={0}
                onPress={() => alert("action")}
              >
                <Box
                  bg={colors.accent}
                  px={4}
                  py={1}
                  borderTopLeftRadius={"xl"}
                >
                  <Cext bold color="white" fontSize={12}>
                    Selengkapnya
                  </Cext>
                </Box>
              </Pressable>
            </Pressable>
            <Pressable
              flex={1}
              bg={"gray.400"}
              overflow={"hidden"}
              m={4}
              onPress={() => alert("action")}
              borderRadius={"2xl"}
            >
              <Pressable position={"absolute"} right={0} bottom={0}>
                <Box
                  bg={colors.accent}
                  px={4}
                  py={1}
                  borderTopLeftRadius={"xl"}
                >
                  <Cext bold color="white" fontSize={12}>
                    Selengkapnya
                  </Cext>
                </Box>
              </Pressable>
            </Pressable>
          </Cwipper>
          <Box>
            <Cext bold mb={2} fontSize={22} ml={4}>
              Promo
            </Cext>
            <FlatList
              ml={4}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                { harganormal: 100000, diskon: 10 },
                { harganormal: 100000, diskon: 10 },
              ]}
              ListFooterComponent={() => (
                <Pressable
                  mr={4}
                  flex={1}
                  onPress={() => navigation.navigate("Keranjang")}
                >
                  <Center
                    bg={colors.accent}
                    shadow={3}
                    p={2}
                    borderRadius={"lg"}
                    mb={4}
                    flex={1}
                    overflow={"hidden"}
                  >
                    <Cext
                      color={"white"}
                      width={104}
                      mx={2}
                      textAlign="center"
                      bold
                      mb={4}
                    >
                      Ingin lihat paket lainnya ?
                    </Cext>

                    <Cutton bg={"white"}>
                      <Cext m={-1} color={"black"}>
                        Klik disini
                      </Cext>
                    </Cutton>
                  </Center>
                </Pressable>
              )}
              renderItem={({ item, index }) => (
                <Pressable mr={4} key={index}>
                  <Center
                    bg={colors.box}
                    shadow={3}
                    p={2}
                    borderRadius={"lg"}
                    mb={4}
                    overflow={"hidden"}
                  >
                    {item.diskon ? (
                      <Box
                        bg={colors.accent}
                        zIndex={2}
                        style={{
                          width: 122,
                          position: "absolute",
                          right: -48,
                          top: 12,
                          height: 16,
                          transform: [{ rotate: "40deg" }],
                        }}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text color={"white"} fontSize={8}>
                          PROMO {item.diskon}%
                        </Text>
                      </Box>
                    ) : null}
                    <Image
                      borderRadius={"lg"}
                      size={"md"}
                      mb={2}
                      alt=""
                      bg={colors.yellow}
                      source={{
                        uri: "https://png.pngtree.com/png-clipart/20230621/original/pngtree-special-promo-banner-design-for-sale-and-offer-vector-png-image_9193515.png",
                      }}
                    />
                    <Cext medium fontSize={13}>
                      PAKET BELAJAR {index + 1}
                    </Cext>
                    {item.diskon ? (
                      <Text strikeThrough fontSize={12}>
                        {formatRupiah(item.harganormal)}
                      </Text>
                    ) : null}
                    <Cext fontSize={12}>
                      {item.diskon
                        ? formatRupiah(
                            item.harganormal -
                              (item.harganormal * item.diskon) / 100
                          )
                        : formatRupiah(item.harganormal)}
                    </Cext>
                  </Center>
                </Pressable>
              )}
            />
          </Box>
          <Cext bold mb={2} fontSize={22} ml={4} mt={4}>
            Info terbaru
          </Cext>
          <Box w={"100%"} px={4} h={120} mb={2}>
            <Image
              source={{
                uri: "https://userpilot.com/blog/wp-content/uploads/2021/11/86D9C0CB-B3BE-451C-8754-BDB7F099863E_b383ac1b6ccbce8d3e6607c3a4b1d54d_2000.png",
              }}
              flex={1}
              borderRadius={"lg"}
              alt=""
            />
          </Box>
          <Cext bold mb={2} fontSize={22} ml={4} mt={4}>
            Paket Aktif
          </Cext>
          <FlatList
            ml={4}
            mb={4}
            data={[{}, {}, {}]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ index }) => (
              <Center
                w={120}
                bg={getRandomColor()}
                borderRadius={"xl"}
                p={2}
                mr={4}
                key={index}
              >
                <Cext bold color="white" fontSize={12}>
                  NAMA PAKET
                </Cext>
                <Cext color="white" numberOfLines={1} fontSize={11}>
                  Nostrud cillum esse eiusmod
                </Cext>
              </Center>
            )}
          />
          <Box>
            <Cext bold mb={2} fontSize={22} ml={4}>
              Belajar
            </Cext>

            <FlatList
              data={[
                {
                  kategori: "Kategori 1",
                  detail: "Jenis-jenis soal yang ada di dalam kategori 1",
                  open: false,
                  new: true,
                },
                {
                  kategori: "Kategori 3",
                  detail: "Jenis-jenis soal yang ada di dalam kategori 1",
                  open: true,
                  new: true,
                },
                {
                  kategori: "Kategori 3",
                  detail: "Jenis-jenis soal yang ada di dalam kategori 1",
                  open: true,
                },
              ]}
              contentContainerStyle={{ paddingTop: 6 }}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  onPress={() => alert(item.open ? "hei" : "Paket locked")}
                >
                  {item.new ? (
                    <Center
                      bg={"white"}
                      borderRadius={"md"}
                      borderWidth={1.4}
                      borderStyle={"dashed"}
                      borderColor={colors.accent}
                      w={10}
                      position={"absolute"}
                      zIndex={2}
                      right={2}
                      top={-6}
                    >
                      <Cext color={colors.accent} black fontSize={10}>
                        BARU
                      </Cext>
                    </Center>
                  ) : null}
                  <HStack
                    justifyContent={"space-between"}
                    p={4}
                    mx={4}
                    borderRadius={"2xl"}
                    alignItems={"center"}
                    bg={colors.box}
                    mb={4}
                    shadow={3}
                    flex={1}
                  >
                    <HStack alignItems={"center"} flex={1}>
                      <Icon
                        as={Ionicons}
                        name="document-text"
                        color={blue}
                        size={10}
                      />
                      <Stack mx={2} flexShrink={1}>
                        <Cext bold>{item.kategori}</Cext>
                        <Cext>{item.detail}</Cext>
                      </Stack>
                    </HStack>

                    <Icon
                      as={Ionicons}
                      color={item.open ? oren : "gray.500"}
                      name={
                        item.open ? "chevron-forward" : "lock-closed-outline"
                      }
                    />
                  </HStack>
                </Pressable>
              )}
            />
            <Text
              onPress={() => navigation.navigate("Belajar")}
              bold
              color={"gray.500"}
              mr={4}
              fontSize={12}
              italic
              alignSelf={"flex-end"}
            >
              Selengkapnya
            </Text>
          </Box>
          <Box>
            <Cext mb={2} ml={4} mt={4} black fontSize={18}>
              Latihan
            </Cext>
            <FlatList
              data={[
                {
                  kategori: "Latihan 1",
                  detail:
                    "Ut excepteur elit ad proident anim amet sit velit. Sunt dolor reprehenderit in exercitation cupidatat sunt laborum sunt ad anim eiusmod sunt. Incididunt occaecat sunt veniam non do ex ad eiusmod. Laboris sint consectetur laborum enim mollit cupidatat aliquip elit aliqua. Anim aliquip minim tempor tempor. Anim do pariatur fugiat laboris incididunt occaecat irure.",
                  progress: "8/10",
                },
                {
                  kategori: "Latihan 3",
                  detail:
                    "onsectetur ut qui sit ipsum ullamco cupidatat elit. Incididunt ipsum nostrud aliquip veniam in. Excepteur aute nisi reprehenderit aute.",
                  progress: "2/10",
                },
                {
                  kategori: "Latihan 3",
                  detail: "Officia enim do aliqua et.",
                  progress: "0/10",
                },
              ]}
              renderItem={({ item, index }) => (
                <Pressable key={index} onPress={() => alert("tes")}>
                  <HStack
                    justifyContent={"space-between"}
                    key={index}
                    p={4}
                    borderRadius={"2xl"}
                    alignItems={"center"}
                    bg={colors.box}
                    shadow={3}
                    mb={3}
                    mx={4}
                    flex={1}
                  >
                    <HStack alignItems={"center"} flex={1}>
                      <Icon
                        as={Ionicons}
                        name="document-text"
                        color={blue}
                        size={10}
                      />
                      <Stack ml={2} flexShrink={1}>
                        <Cext bold>{item.kategori}</Cext>
                        <Cext mr={3} numberOfLines={2}>
                          {item.detail}
                        </Cext>
                      </Stack>
                    </HStack>

                    <Box bg={oren} p={1} borderRadius={"md"}>
                      <Text bold color="white" fontSize={10}>
                        {item.progress}
                      </Text>
                    </Box>
                  </HStack>
                </Pressable>
              )}
            />
            <Text
              bold
              color={"gray.600"}
              mr={4}
              fontSize={12}
              italic
              alignSelf={"flex-end"}
            >
              Selengkapnya
            </Text>
          </Box>
        </ScrollView>
      </Board>
    </NativeBaseProvider>
  );
};

export default Home;
