import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  Stack,
  Text,
} from "native-base";
import React, { useContext, useState } from "react";
import { Checkbox } from "react-native-paper";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Headering from "../../components/Headering";
import { ColorContext } from "../../contexts/ColorContext";
import formatRupiah from "../../helper/rupiah";

const Keranjang = ({ navigation }) => {
  const [checked, setChecked] = useState([]);
  const { colors } = useContext(ColorContext);
  const [widthVoc, setWidthVoc] = useState(160);
  const [voc, setVoc] = useState("");

  return (
    <Board>
      <Headering tit="BELI PAKET" gray />
      <Stack flex={1}>
        <FlatList
          data={[
            { harganormal: 100000, diskon: 10 },
            { harganormal: 100000, diskon: 10 },
            { harganormal: 100000 },
            { harganormal: 100000 },
            { harganormal: 100000 },
            { harganormal: 100000 },
          ]}
          renderItem={({ item, index }) => (
            <Stack key={index}>
              <Divider mt={2} />
              <HStack alignItems={"center"} overflow={"hidden"} pl={2}>
                {item.diskon ? (
                  <Box
                    bg={colors.accent}
                    style={{
                      width: 122,
                      position: "absolute",
                      right: -28,
                      top: 16,
                      height: 23,
                      transform: [{ rotate: "40deg" }],
                    }}
                    alignItems={"center"}
                  >
                    <Cext color={"white"} fontSize={10}>
                      PROMO 10%
                    </Cext>
                  </Box>
                ) : null}
                <Checkbox
                  color={colors.accent}
                  status={checked.includes(index) ? "checked" : ""}
                  onPress={() =>
                    setChecked(
                      (prevChecked) =>
                        prevChecked.includes(index)
                          ? prevChecked.filter((item) => item !== index) // Remove id if it's already checked
                          : [...prevChecked, index] // Add id if it's not checked
                    )
                  }
                />
                <Image
                  bg={colors.accent}
                  borderRadius={"2xl"}
                  mt={2}
                  source={{
                    uri: "https://png.pngtree.com/png-clipart/20230621/original/pngtree-special-promo-banner-design-for-sale-and-offer-vector-png-image_9193515.png",
                  }}
                  alt=""
                  size="xl"
                />
                <Stack flex={1} alignItems={"center"}>
                  <Cext bold fontSize={18}>
                    Paket Belajar {index + 1}
                  </Cext>
                  {item.diskon ? (
                    <Text strikeThrough>{formatRupiah(item.harganormal)}</Text>
                  ) : null}
                  <Cext bold>
                    {item.diskon
                      ? formatRupiah(
                          item.harganormal -
                            (item.harganormal * item.diskon) / 100
                        )
                      : formatRupiah(item.harganormal)}
                  </Cext>
                </Stack>
              </HStack>
            </Stack>
          )}
        />
      </Stack>
      <Divider />
      <Pressable>
        <HStack
          px={4}
          py={2}
          bg={colors.box}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <Stack space={1}>
            <HStack bg={"orange.100"} borderRadius={"lg"} alignItems={"center"}>
              <Icon as={Ionicons} name="gift" color={colors.accent} ml={2} />
              <Input
                onFocus={() => setWidthVoc("full")}
                onBlur={() => setWidthVoc(160)}
                onEndEditing={() => setWidthVoc(160)}
                autoCapitalize="characters"
                variant={"unstyled"}
                value={voc}
                onChangeText={(v) => setVoc(v)}
                placeholder="Masukkan Voucher"
                width={widthVoc}
              />
            </HStack>
          </Stack>
          <Stack>
            <Cext>{voc !== "" && "VOUCHER INFO"}</Cext>
            <Cext bold>-{formatRupiah(10000)}</Cext>
          </Stack>
        </HStack>
      </Pressable>
      <Divider />
      <HStack
        p={2}
        px={4}
        bg={colors.box}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Pressable
          w={184}
          py={2}
          alignItems={"center"}
          bg={colors.accent}
          borderRadius={"lg"}
          onPress={() => navigation.navigate("Cekot")}
        >
          <HStack alignItems={"center"} space={2}>
            <Cext color="white" bold>
              Chekout
            </Cext>
            <Icon as={Ionicons} name="cart" color={"white"} />
          </HStack>
        </Pressable>
        <Cext fontSize={18} bold>
          {formatRupiah(10000)}
        </Cext>
      </HStack>
    </Board>
  );
};

export default Keranjang;
