import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Stack,
} from 'native-base';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'react-native-paper';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import Cinput from '../../components/Cinput';
import Headering from '../../components/Headering';
import { AuthContext } from '../../contexts/AuthContext';
import { ColorContext } from '../../contexts/ColorContext';

const EditProfile = ({ navigation }) => {
  const { authState } = useContext(AuthContext);
  const { userData } = authState;
  const { colors } = useContext(ColorContext);

  const [_text, setText] = useState('');

  return (
    <Board>
      <Headering
        tit={'EDIT PROFILE'}
        right={
          <Pressable ml={-4} onPress={() => navigation.navigate('Setting')}>
            <Center bg={colors.accent} px={2} py={1} borderRadius={'full'}>
              <Cext fontSize={12} bold color="white">
                Simpan
              </Cext>
            </Center>
          </Pressable>
        }
      />

      <ScrollView>
        <Stack>
          <HStack space={3} mx={4} mt={4} alignItems={'center'}>
            <Box position={'relative'}>
              <LinearGradient
                // Background Linear Gradient
                colors={[colors.primary, colors.green]}
                start={{ x: 1, y: 0.8 }}
                end={{ x: 0.1, y: 1 }}
                style={{
                  width: 120,
                  height: 120,

                  borderRadius: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={{
                    uri: userData.pic,
                  }}
                  alt=""
                  borderRadius={'full'}
                  style={{ width: 110, height: 110, borderRadius: 55 }}
                />
              </LinearGradient>
            </Box>
            <Stack space={1}>
              <Cext black fontSize={18}>
                Update Foto Profil
              </Cext>
              <Cext color="gray.400">Ukuran maks. 2 MB</Cext>
              <HStack space={2} alignItems={'center'}>
                <Button
                  size={'xs'}
                  h={8}
                  bg={colors.green}
                  borderRadius={'lg'}
                  leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" />}
                >
                  <Cext fontSize={12} color="white" mt={-0.5}>
                    Unggah
                  </Cext>
                </Button>
                <Cext medium fontSize={12} color={colors.red}>
                  Hapus Foto Profil
                </Cext>
              </HStack>
            </Stack>
          </HStack>
          <Stack space={3} p={4}>
            {/* Kasus 1: Input untuk email dengan validasi email otomatis */}

            <Cinput
              isRequired
              label="Nama Lengkap"
              value={userData.nama}
              onChangeText={(v) => setText(v)}
              placeholder="Enter your email"
              rightIcon={
                <Icon
                  as={MaterialIcons}
                  size={5}
                  ml={2}
                  color={colors.mint}
                  name="check"
                />
              }
            />

            <Cinput
              isRequired
              label="Nomor Telepon"
              value={userData.nohp}
              onChangeText={(v) => setText(v)}
              placeholder="Enter your email"
              validation={{
                errorText: '',
                validText: 'Nomor Terverifikasi',
              }}
            />

            <HStack alignItems={'center'} mb={3} mt={-3} ml={-2}>
              <Checkbox status="checked" color={colors.green} />
              <Cext>Dapat dihubungi melalui WhatsApp</Cext>
            </HStack>

            <Cinput
              isRequired
              label="Email"
              value={userData.email}
              onChangeText={(v) => setText(v)}
              placeholder="Enter your email"
              sublabel={
                'Digunakan untuk recovery password dan manajemen akun anda.'
              }
              validation={{
                email: true, // Validasi email otomatis
                errorText: '',
                validText: 'Email valid',
              }}
            />

            <Cinput
              label="Instagram"
              value={null}
              leftIcon={
                <Icon
                  as={Ionicons}
                  name="logo-instagram"
                  color={colors.pink}
                  size={5}
                  mr={2}
                />
              }
              onChangeText={(v) => setText(v)}
              placeholder="Instagram"
              validation={{
                email: true, // Validasi email otomatis
                errorText: '',
                validText: '',
              }}
            />
            <Cinput
              isRequired
              label="Provinsi"
              value={null}
              rightIcon={<Icon as={Ionicons} name="chevron-down" />}
              onChangeText={(v) => setText(v)}
              placeholder="Pilih Provinsi"
              validation={{
                email: true, // Validasi email otomatis
                errorText: '',
                validText: '',
              }}
            />

            <Cinput
              isRequired
              label="Kota/Kabupaten"
              value={null}
              onChangeText={(v) => setText(v)}
              placeholder="Pilih Kota/Kabupaten"
              rightIcon={<Icon as={Ionicons} name="chevron-down" />}
              validation={{
                email: true, // Validasi email otomatis
                errorText: '',
                validText: 'Email valid',
              }}
            />

            <Button bg={'gray.700'} borderRadius={'xl'} mt={4}>
              <Cext bold color={'white'}>
                Ganti Password
              </Cext>
            </Button>
            <Button variant={'ghost'} borderRadius={'xl'} mt={8}>
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
