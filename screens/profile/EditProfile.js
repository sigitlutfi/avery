import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import React, { useContext, useState } from "react";
import { Checkbox } from "react-native-paper";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Cinput from "../../components/Cinput";
import Headering from "../../components/Headering";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorContext } from "../../contexts/ColorContext";

const EditProfile = ({ navigation }) => {
  const { authState } = useContext(AuthContext);
  const { userData } = authState;
  const { colors } = useContext(ColorContext);

  const [text, setText] = useState("");

  return (
    <Board>
      <Headering
        tit={"EDIT PROFILE"}
        right={
          <Pressable ml={-4} onPress={() => navigation.navigate("Setting")}>
            <Center bg={colors.accent} px={2} py={1} borderRadius={"full"}>
              <Cext fontSize={12} bold color="white">
                Simpan
              </Cext>
            </Center>
          </Pressable>
        }
      />

      <ScrollView>
        <Stack>
          <HStack space={3} mx={4} mt={4} alignItems={"center"}>
            <Box position={"relative"}>
              <LinearGradient
                // Background Linear Gradient
                colors={[colors.primary, colors.green]}
                start={{ x: 1, y: 0.8 }}
                end={{ x: 0.1, y: 1 }}
                style={{
                  width: 120,
                  height: 120,

                  borderRadius: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: userData.pic,
                  }}
                  alt=""
                  borderRadius={"full"}
                  style={{ width: 110, height: 110, borderRadius: 55 }}
                />
              </LinearGradient>
            </Box>
            <Stack space={1}>
              <Cext black fontSize={18}>
                Update Foto Profil
              </Cext>
              <Cext color="gray.400">Ukuran maks. 2 MB</Cext>
              <HStack space={2} alignItems={"center"}>
                <Button
                  size={"xs"}
                  h={8}
                  bg={colors.green}
                  borderRadius={"lg"}
                  leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" />}
                >
                  <Cext fontSize={12} color="white" mt={-0.5}>
                    Unggah
                  </Cext>
                </Button>
                <Cext bold color={colors.red}>
                  Hapus Foto Profil
                </Cext>
              </HStack>
            </Stack>
          </HStack>
          <Stack space={2} p={4}>
            {/* Kasus 1: Input untuk email dengan validasi email otomatis */}
            <Cinput
              isRequired
              label="Email"
              value={text}
              onChangeText={(v) => setText(v)}
              placeholder="Enter your email"
              validation={{
                email: true, // Validasi email otomatis
                errorText: "Format email tidak valid",
                validText: "Email valid",
              }}
            />

            {/* Kasus 2: Input dengan minimal dan maksimal karakter */}
            <Cinput
              label="Username"
              value={text}
              onChangeText={(v) => setText(v)}
              placeholder="Enter your username"
              validation={{
                minLength: 5, // Minimal 5 karakter
                maxLength: 15, // Maksimal 15 karakter
                errorText: "Username tidak valid",
                validText: "Username valid",
              }}
            />

            {/* Kasus 3: Input password dengan toggle visibility dan validasi minLength */}
            <Cinput
              label="Password"
              placeholder="Enter your password"
              value={text}
              onChangeText={(v) => setText(v)}
              secureTextEntry // Input dalam mode sandi
              togglePassword // Menambahkan tombol untuk toggle visibility
              validation={{
                minLength: 8, // Minimal 8 karakter
                errorText: "Password terlalu pendek",
                validText: "Password valid",
              }}
            />

            {/* Kasus 4: Input dengan ikon di kiri dan kanan */}
            <Cinput
              label="Phone Number"
              value={text}
              onChangeText={(v) => setText(v)}
              placeholder="Enter your phone number"
              leftIcon={<MaterialIcons name="phone" />} // Ikon di kiri
              rightIcon={<MaterialIcons name="check" />} // Ikon di kanan
              validation={{
                errorText: "Nomor tidak valid",
                validText: "Nomor valid",
              }}
            />

            {/* Kasus 5: Memaksa menampilkan error secara manual */}
            <Cinput
              label="Custom Field"
              value={text}
              onChangeText={(v) => setText(v)}
              placeholder="Enter custom value"
              forceShowError={true} // Paksa menampilkan error
              validation={{
                errorText: "Input tidak boleh kosong",
              }}
            />
            <Cext bold>Nama Lengkap</Cext>
            <Box bg={colors.box} borderRadius={"xl"} mt={1} mb={3}>
              <Input
                variant={"unstyled"}
                value={userData.nama}
                _input={{ color: colors.textLight }}
              />
            </Box>

            <Cext bold>Nomor Telepon</Cext>
            <Box bg={colors.box} borderRadius={"xl"} mt={1} mb={1}>
              <Input
                variant={"unstyled"}
                value={userData.nohp}
                _input={{ color: colors.textLight }}
              />
            </Box>
            <HStack alignItems={"center"} mb={3}>
              <Checkbox status="checked" color={colors.green} />
              <Cext>Dapat dihubungi melalui WhatsApp</Cext>
            </HStack>

            <Cext bold>Email</Cext>
            <HStack
              bg={colors.box}
              borderRadius={"xl"}
              mt={1}
              mb={3}
              pr={2}
              alignItems={"center"}
            >
              <Input
                variant={"unstyled"}
                value={userData.email}
                flex={1}
                _input={{ color: colors.textLight }}
              />
              <Icon as={Ionicons} name="checkmark-done" color={colors.green} />
            </HStack>
            <Cext bold>Provinsi</Cext>
            <HStack
              bg={colors.box}
              borderRadius={"xl"}
              mt={1}
              mb={3}
              pr={2}
              alignItems={"center"}
            >
              <Input variant={"unstyled"} placeholder="Provinsi" flex={1} />
              <Icon as={Ionicons} name="chevron-down" size={6} />
            </HStack>

            <Cext bold>Kota / Kabupaten</Cext>
            <HStack
              bg={colors.box}
              borderRadius={"xl"}
              mt={1}
              mb={3}
              pr={2}
              alignItems={"center"}
            >
              <Input
                variant={"unstyled"}
                placeholder="Kota/Kabupaten"
                flex={1}
              />
              <Icon as={Ionicons} name="chevron-down" size={6} />
            </HStack>

            <Button bg={"gray.700"} borderRadius={"xl"}>
              <Cext bold color={"white"}>
                Ganti Password
              </Cext>
            </Button>
            <Button variant={"ghost"} borderRadius={"xl"} mt={8}>
              <Cext bold color={colors.red}>
                Hapus Akun
              </Cext>
            </Button>
          </Stack>
        </Stack>
      </ScrollView>
    </Board>
  );
};
export default EditProfile;
