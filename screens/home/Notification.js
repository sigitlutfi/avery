// App.js

import { Ionicons } from '@expo/vector-icons';
import {
  Center,
  Divider,
  FlatList,
  HStack,
  Icon,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import React from 'react';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import Headering from '../../components/Headering';

const Notification = () => {
  return (
    <Board>
      <Headering
        tit={'NOTIFIKASI'}
        right={
          <Pressable>
            <Center
              position={'absolute'}
              top={0}
              right={-4}
              w={17}
              h={17}
              bg={'red.500'}
              borderRadius={'full'}
              zIndex={4}
            >
              <Text color={'white'} bold fontSize={8}>
                24
              </Text>
            </Center>
            <Icon
              name="notifications-outline"
              as={Ionicons}
              size={8}
              color={'white'}
            />
          </Pressable>
        }
      />
      <FlatList
        px={4}
        data={[{}, {}, {}, {}, {}, {}]}
        renderItem={({ index }) => (
          <Pressable mb={4} onPress={() => alert('this action')} key={index}>
            <HStack>
              <Image
                bg={'amber.300'}
                borderRadius={'2xl'}
                source={{
                  uri: 'https://png.pngtree.com/png-clipart/20230621/original/pngtree-special-promo-banner-design-for-sale-and-offer-vector-png-image_9193515.png',
                }}
                alt=""
                size="xl"
              />
              <Stack ml={2} flex={1}>
                <Cext bold fontSize={16}>
                  Title Notification
                </Cext>
                <Cext numberOfLines={5} flexShrink={1} textAlign="justify">
                  Cillum ad consequat Lorem excepteur tempor. Esse in dolore
                  officia fugiat Lorem. Consequat ex sint et sint sunt esse
                  aute. Laborum deserunt enim consequat commodo ea duis enim qui
                  velit ea amet voluptate eu nulla. Esse laboris esse est
                  laborum dolore.Pariatur laborum id esse non laborum esse
                  proident duis sint. Veniam minim velit ut ea tempor duis
                  consectetur. Duis minim anim cillum veniam duis enim labore
                  nostrud officia eiusmod consectetur. Esse id mollit aliquip
                  anim Lorem occaecat excepteur aute ipsum amet ut officia nulla
                  consequat. Esse consectetur nulla officia pariatur dolore ea
                  proident eiusmod amet amet sit. Excepteur est pariatur irure
                  nostrud ea magna dolor. Anim enim adipisicing nostrud dolor
                  laborum excepteur cillum.
                </Cext>
              </Stack>
            </HStack>
            <Divider mt={4} />
          </Pressable>
        )}
      />
    </Board>
  );
};

export default Notification;
