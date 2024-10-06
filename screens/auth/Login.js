import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Button, Center, Icon, Image, VStack } from 'native-base';
import * as React from 'react';
import { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import Cinput from '../../components/Cinput';
import Cutton from '../../components/Cutton';
import adjustColor from '../../constants/adjustColor';
import { AuthContext } from '../../contexts/AuthContext';
import { ColorContext } from '../../contexts/ColorContext';
import { ConfigContext } from '../../contexts/ConfigContext';
import useHttpHelper from '../../helper/httpHelp';

function Login({ navigation, route }) {
  const { POST } = useHttpHelper(); // use POST function from the hook
  const [username, _setUsername] = useState('maya');
  const [password, _setPassword] = useState('rasakanku');
  const { signIn } = useContext(AuthContext);
  const { colors } = useContext(ColorContext);
  const { config } = useContext(ConfigContext);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Check if there's data returned from SecondScreen
      if (route.params?.returnUsername) {
        _setUsername(route.params.returnUsername); // Set the returned data
      }
      if (route.params?.returnPassword) {
        _setPassword(route.params.returnPassword); // Set the returned data
      }
    }, [route.params?.returnPassword, route.params?.returnUsername]) // Depend on the params
  );

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await POST({
        url: '/api/login', // The endpoint you want to hit
        json: { username: username, password: password }, // The JSON data you want to post
        c: false, // Set to true to log full response (optional)
      });

      if (result.status === 200) {
        signIn({
          data: result.data.data,
          token: result.data.data.token,
        });
      }
    } catch (error) {
      console.log(error);
      //setError('An unexpected error occurred'); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Board statusBarColor={colors.bg} statusBarStyle={'light'}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Box flex={1}>
            <Box bg={colors.box} mt={'10%'} mx={6} px={4} borderRadius={'xl'}>
              <VStack space={2}>
                <Center h={100} w={180} alignSelf={'center'} mt={4}>
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
                <Cext bold alignSelf={'center'} mb={2} fontSize={14}>
                  {config.subname_app}
                </Cext>
                <Cext
                  fontSize={20}
                  underline
                  black
                  color={colors.primary}
                  onPress={() => {
                    _setUsername('superadmin');
                    _setPassword('sangatrahasia');
                  }}
                >
                  Masuk
                </Cext>
                <Cinput
                  leftIcon={<Icon as={Ionicons} name="person" />}
                  placeholder="Username"
                  label={'Username'}
                  value={username}
                  onChangeText={(v) => _setUsername(v)}
                  bg={'gray.100'}
                />
                <Cinput
                  leftIcon={<Icon as={Ionicons} name="lock-closed" />}
                  placeholder="Password"
                  label={'Password'}
                  value={password}
                  onChangeText={(v) => _setPassword(v)}
                  bg={'gray.100'}
                  secureTextEntry
                  togglePassword
                />
                <Cext
                  color={colors.primary}
                  bold
                  fontSize={11}
                  alignSelf={'flex-end'}
                >
                  Lupa kata sandi
                </Cext>
                <Cutton
                  bg={colors.primary}
                  borderRadius={'xl'}
                  borderWidth={2}
                  loading={loading}
                  borderColor={colors.primary}
                  onPress={handleLogin}
                >
                  <Cext bold color={'white'}>
                    Masuk
                  </Cext>
                </Cutton>
                <Box my={2}>
                  <Box h={0.5} bg={'gray.400'} borderRadius={'2xl'} />
                  <Cext
                    position={'absolute'}
                    top={-12}
                    alignSelf={'center'}
                    px={4}
                    bg={colors.box}
                    color={adjustColor(colors.textLight, -30)}
                    bold
                  >
                    Atau masuk menggunakan
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
                  Masuk menggunakan Google
                </Button>

                <Cext
                  alignSelf={'center'}
                  bg={colors.box}
                  px={4}
                  bold
                  color={adjustColor(colors.textLight, -30)}
                >
                  Anda belum punya akun ?
                </Cext>
                <Button
                  borderRadius={'xl'}
                  variant={'outline'}
                  borderWidth={2}
                  borderColor={colors.accent}
                  mb={4}
                  onPress={() =>
                    navigation.navigate('Register', {
                      onGoBack: (data) => _setUsername(data), // Callback function to set data
                    })
                  }
                >
                  <Cext bold color={colors.accent}>
                    Buat akun sekarang
                  </Cext>
                </Button>
              </VStack>
            </Box>
            <Center position={'absolute'} bottom={4} alignSelf={'center'}>
              <Cext fontSize={10}>
                Dengan menggunakan ini anda telah menyetujui{' '}
                <Cext
                  underline
                  color={colors.primary}
                  fontSize={10}
                  onPress={() => alert('open privacy')}
                >
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
    </KeyboardAvoidingView>
  );
}
export default Login;
