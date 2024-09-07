import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  Image,
  Pressable,
  Stack,
} from "native-base";
import React, { useContext, useState } from "react";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Headering from "../../components/Headering";
import { ColorContext } from "../../contexts/ColorContext";
import formatRupiah from "../../helper/rupiah";

const Cekot = ({ navigation, route }) => {
  const [checked, setChecked] = useState([]);
  const { colors } = useContext(ColorContext);
  const [checktot, setChecktot] = useState(false);
  const [text, setText] = React.useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [payment, setPayment] = useState([
    {
      tipe: "TRANSFER BANK",
      opsi: [
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Logo_Bank_Rakyat_Indonesia.svg/599px-Logo_Bank_Rakyat_Indonesia.svg.png",
          label: "BRI",
        },
        {
          icon: "https://seeklogo.com/images/B/bank-mandiri-logo-7C17EA0266-seeklogo.com.png",
          label: "MANDIRI",
        },
      ],
    },
    {
      tipe: "E-WALLET",
      opsi: [
        {
          icon: "https://static.vecteezy.com/system/resources/previews/028/766/360/large_2x/ovo-ewallet-payment-icon-symbol-free-png.png",
          label: "OVO",
        },
        {
          icon: "https://static.vecteezy.com/system/resources/previews/029/089/705/large_2x/shopeepay-payment-icon-symbol-free-png.png",
          label: "Shopee Pay",
        },
        {
          icon: "https://static.vecteezy.com/system/resources/previews/028/766/364/large_2x/gopay-payment-icon-symbol-free-png.png",
          label: "GoPay",
        },
      ],
    },
    {
      tipe: "Convenience Store",
      opsi: [
        {
          icon: "https://logos-world.net/wp-content/uploads/2022/04/Alfamart-Logo-700x394.png",
          label: "Alfamart",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Logo_Indomaret.png/800px-Logo_Indomaret.png",
          label: "Indomaret",
        },
      ],
    },
  ]);

  return (
    <Board>
      <Headering tit="CHECKOUT" />
      <Stack flex={1}>
        <HStack alignItems={"center"} px={4} mb={2} space={2}>
          <Cext bold fontSize={16}>
            DETAIL PEMBELIAN
          </Cext>
        </HStack>

        <FlatList
          data={[
            { harganormal: 100000, diskon: 10 },
            { harganormal: 100000, diskon: 10 },
            { harganormal: 100000 },
          ]}
          renderItem={({ item, index }) => (
            <Stack key={index}>
              <HStack
                alignItems={"center"}
                mx={4}
                overflow={"hidden"}
                justifyContent={"space-between"}
              >
                <Cext>Paket Pembelajaran {index + 1}</Cext>
                <Cext>{formatRupiah(item.harganormal)}</Cext>
              </HStack>
              <Divider m={2} />
            </Stack>
          )}
        />
        <Divider my={2} />
        <HStack
          alignItems={"center"}
          mx={4}
          overflow={"hidden"}
          justifyContent={"space-between"}
        >
          <Cext bold fontSize={14}>
            DISKON 10%
          </Cext>
          <Cext bold fontSize={14}>
            -{formatRupiah(80000)}
          </Cext>
        </HStack>
        <Divider my={2} />
        <HStack
          alignItems={"center"}
          mx={4}
          overflow={"hidden"}
          justifyContent={"space-between"}
        >
          <Cext bold fontSize={14}>
            VOUCHER ASHJKAFIU
          </Cext>
          <Cext bold fontSize={14}>
            -{formatRupiah(80000)}
          </Cext>
        </HStack>
        <Divider my={2} />
        <HStack
          alignItems={"center"}
          mx={4}
          overflow={"hidden"}
          justifyContent={"space-between"}
        >
          <Cext bold fontSize={16}>
            TOTAL{" "}
          </Cext>
          <Cext bold fontSize={16}>
            {formatRupiah(220000)}
          </Cext>
        </HStack>
        <Divider my={2} />
        <Pressable onPress={() => setIsOpen(true)}>
          <HStack px={4} justifyContent={"space-between"}>
            <Cext>Pilih Metode Pembayaran</Cext>
            <HStack alignItems={"center"} space={2}>
              <Icon as={Ionicons} name="storefront" color={colors.red} />
              <Cext fontSize={18} color={colors.red}>
                Alfamart
              </Cext>
            </HStack>
          </HStack>
        </Pressable>
        <Divider my={2} />
        <Pressable
          m={4}
          p={4}
          bg={colors.accent}
          alignItems={"center"}
          borderRadius={"xl"}
          onPress={() => navigation.goBack()}
        >
          <Cext bold fontSize={16} color="white">
            BAYAR SEKARANG
          </Cext>
        </Pressable>
      </Stack>
      <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Actionsheet.Content bg={colors.box}>
          <Box w="100%" px={4} justifyContent="center">
            <Cext black fontSize={18} alignSelf={"center"} mb={4}>
              Pilih Metode Pembayaran
            </Cext>
            {payment.map((v, i) => {
              return (
                <Box mb={4} key={i}>
                  <Cext black fontSize={16} mb={2}>
                    {v.tipe}
                  </Cext>
                  {v.opsi.map((j, k) => (
                    <Pressable mb={2} onPress={() => setIsOpen(false)} key={k}>
                      <HStack alignItems={"center"} space={4}>
                        <Image alt="" source={{ uri: j.icon }} h={5} w={5} />
                        <Cext>{j.label}</Cext>
                      </HStack>
                    </Pressable>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Board>
  );
};

export default Cekot;
