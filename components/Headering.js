import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, Pressable } from 'native-base';
import React, { useContext } from 'react';

import Cext from './Cext';
import { ColorContext } from '../contexts/ColorContext';

const Headering = ({ tit, right }) => {
  const navigation = useNavigation();
  const { colors } = useContext(ColorContext);
  const title = tit ? tit : '';

  return (
    <Box bg={colors.primary}>
      <Box p={4} bg={colors.primary}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack alignItems={'center'}>
            <Pressable pr={2} onPress={() => navigation.goBack()}>
              <Icon
                as={Ionicons}
                name="chevron-back"
                size={7}
                color={'white'}
              />
            </Pressable>
            <Cext bold fontSize={20} color={'white'}>
              {title}
            </Cext>
          </HStack>
          {right ? right : <Box height={4} width={12} />}
        </HStack>
      </Box>
      <Box h={4} borderTopRadius={'2xl'} bg={colors.bg}></Box>
    </Box>
  );
};

export default Headering;
