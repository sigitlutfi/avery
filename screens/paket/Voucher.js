import {
  Box,
  Divider,
  HStack,
  Image,
  Input,
  Pressable,
  Stack,
} from 'native-base';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Cext from '../../components/Cext';
import Headering from '../../components/Headering';
import { ColorContext } from '../../contexts/ColorContext';

const Voucher = () => {
  const { colors } = useContext(ColorContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Headering tit="Voucher" />
      <Stack flex={1}>
        <HStack alignItems={'center'} px={4} space={2}>
          <Cext bold fontSize={16}>
            GUNAKAN VOUCHER DISKON
          </Cext>

          <Image
            source={require('../../assets/images/discount.png')}
            width={6}
            height={6}
            alt=""
          />
        </HStack>
        <Cext ml={4} fontSize={12} mb={2}>
          Masukkan kode voucher dari kode referral, ataupun dari iklan.
        </Cext>
        <Box bg={'gray.100'} mx={4} borderRadius={'xl'}>
          <Input variant={'unstyled'} placeholder="MASUKKAN KODE VOUCHER" />
        </Box>
        <Pressable
          m={4}
          alignItems={'center'}
          p={3}
          bg={colors.primary}
          borderRadius={'xl'}
        >
          <Cext fontSize={16} color="white">
            GUNAKAN VOUCHER
          </Cext>
        </Pressable>
        <Divider />
      </Stack>
    </SafeAreaView>
  );
};

export default Voucher;
