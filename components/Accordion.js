import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, Icon } from 'native-base';
import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

import Cext from './Cext';
import { ColorContext } from '../contexts/ColorContext';

const AccordionItem = ({ item, children }) => {
  const { colors } = useContext(ColorContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <Animated.View
      layout={Layout}
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        borderWidth: expanded ? 2 : 0,
        borderColor: colors.primary,
        backgroundColor: colors.box,
        borderRadius: 12,
        marginBottom: 4,
      }}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <HStack alignItems={'center'}>
          <Icon
            as={Ionicons}
            name="briefcase"
            color={colors.primary}
            size={7}
          />
          <Cext bold ml={2} fontSize={20}>
            {item.title}
          </Cext>
        </HStack>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          as={Ionicons}
          size={8}
        />
      </TouchableOpacity>
      {expanded && <View>{children}</View>}
    </Animated.View>
  );
};
const AnimatedAccordionList = ({ data }) => {
  const { colors } = useContext(ColorContext);
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <AccordionItem item={item} key={index}>
          {/* Customizable content goes here */}

          <Box p={2}>
            <Cext fontSize={16}>{item.content}</Cext>
            <Cext italic mt={2} fontSize={12}>
              Aktif sampai 11 Desember 2024
            </Cext>
            <HStack
              flex={1}
              bg={colors.accent}
              alignItems={'center'}
              py={2}
              borderRadius={'xl'}
              mt={2}
              justifyContent={'center'}
            >
              <Icon as={Ionicons} name="repeat" color="white" size={8} />
              <Cext bold color="white" ml={2} fontSize={18}>
                PERBARUI PAKET
              </Cext>
            </HStack>
          </Box>
        </AccordionItem>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default AnimatedAccordionList;
