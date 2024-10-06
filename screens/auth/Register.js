import { FontAwesome6 } from '@expo/vector-icons';
import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  ScrollView,
  VStack,
} from 'native-base';
import * as React from 'react';
import { useState } from 'react';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import Cinput from '../../components/Cinput';
import Cutton from '../../components/Cutton';
import adjustColor from '../../constants/adjustColor';
import { ColorContext } from '../../contexts/ColorContext';
import { ConfigContext } from '../../contexts/ConfigContext';
import useHttpHelper from '../../helper/httpHelp';
function Register({ navigation }) {
  const { POST } = useHttpHelper(); // use POST function from the hook
  const { colors } = React.useContext(ColorContext);
  const { config } = React.useContext(ConfigContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await POST({
        url: '/register', // The endpoint you want to hit
        json: {
          username: username,
          password: password,
          email: email,
          name: nama,
          hp: hp,
        }, // The JSON data you want to post
        c: false, // Set to true to log full response (optional)
      });

      if (result.data.status === 'success') {
        navigation.setParams({
          returnUsername: username,
          returnPassword: password,
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      //setError('An unexpected error occurred'); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Board statusBarColor={colors.bg} statusBarStyle={'light'}>
      <ScrollView>
        <Box flex={1}>
          <Box bg={colors.box} mt={'10%'} mx={6} px={4} borderRadius={'xl'}>
            <VStack space={4}>
              <Center h={70} w={160} mt={4} alignSelf={'center'}>
                <Image
                  source={config.icon}
                  size={'full'}
                  resizeMode="contain"
                  alt=""
                />
              </Center>
              <Cext black alignSelf={'center'} fontSize={16}>
                {config.name_app}
              </Cext>
              <Cext bold alignSelf={'center'} mt={-4} mb={2} fontSize={14}>
                {config.subname_app}
              </Cext>
              <Cext fontSize={20} underline black color={colors.primary}>
                Daftar
              </Cext>
              <Cinput
                placeholder="Akun pengguna"
                label="Akun pengguna"
                bg={colors.bg}
                onChangeText={(v) => setUsername(v)}
                validation={{ minLength: 4 }}
                value={username}
              />
              <Cinput
                placeholder="Kata sandi"
                label="Kata sandi"
                value={password}
                validation={{
                  minLength: 8,
                }}
                secureTextEntry
                togglePassword
                onChangeText={(v) => setPassword(v)}
                bg={colors.bg}
              />
              <Cinput
                placeholder="Nama Lengkap"
                label="Nama Lengkap"
                validation={{ minLength: 2 }}
                value={nama}
                onChangeText={(v) => setNama(v)}
                bg={colors.bg}
              />
              <Cinput
                placeholder="Nomor Handphone"
                label="Nomor Handphone"
                bg={colors.bg}
                value={hp}
                onChangeText={(v) => setHp(v)}
                validation={{ phone: true }}
              />
              <Cinput
                placeholder="Email"
                label="Email"
                value={email}
                onChangeText={(v) => setEmail(v)}
                validation={{ email: true }}
                bg={colors.bg}
              />

              <Cutton
                bg={colors.primary}
                borderRadius={'xl'}
                borderWidth={2}
                loading={loading}
                borderColor={colors.primary}
                onPress={handleLogin}
              >
                <Cext bold color={'white'}>
                  Daftar
                </Cext>
              </Cutton>
              <Box>
                <Box h={0.5} bg={'gray.400'} borderRadius={'2xl'} />
                <Cext
                  position={'absolute'}
                  top={-12}
                  alignSelf={'center'}
                  bg={colors.box}
                  color={adjustColor(colors.textLight, -30)}
                  px={4}
                  bold
                >
                  Atau daftar menggunakan
                </Cext>
              </Box>

              <Button
                bg={colors.lime}
                borderRadius={'xl'}
                _text={{ color: 'white' }}
                leftIcon={
                  <Icon as={FontAwesome6} name="google" color={'white'} />
                }
              >
                Daftar menggunakan Google
              </Button>
              <Cext
                alignSelf={'center'}
                px={4}
                bg={colors.box}
                color={adjustColor(colors.textLight, -30)}
                bold
              >
                Anda sudah punya akun ?
              </Cext>

              <Button
                borderRadius={'xl'}
                variant={'outline'}
                borderWidth={2}
                borderColor={colors.accent}
                mb={4}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Cext bold color={colors.accent}>
                  Login sekarang
                </Cext>
              </Button>
            </VStack>
          </Box>
          <Center mt={19} mb={4} alignSelf={'center'}>
            <Cext fontSize={10}>
              Dengan menggunakan ini anda telah menyetujui{' '}
              <Cext underline color={colors.primary} fontSize={10}>
                PRIVACY POLICY
              </Cext>{' '}
              dari kami.
            </Cext>
            <Cext color={'gray.500'} fontSize={10}>
              Ver. {config.version}
            </Cext>
          </Center>
        </Box>
      </ScrollView>
    </Board>
  );
}
export default Register;
