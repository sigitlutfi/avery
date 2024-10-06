import { Ionicons } from '@expo/vector-icons';
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import EnhancedImageViewing from 'react-native-image-viewing/dist/ImageViewing';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import adjustColor from '../../constants/adjustColor';
import { ColorContext } from '../../contexts/ColorContext';
import { useCountdownTimer } from '../../helper/timeHelper';

const DetailLatihangambar = ({ navigation, route }) => {
  const { tit } = route.params;
  const { timeLeft } = useCountdownTimer();
  const { colors } = useContext(ColorContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (timeLeft === '00:01') {
      navigation.goBack(); // Navigate back when time is 00:01
    }
  }, [timeLeft, navigation]);

  const page = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  const options = [
    {
      label: 'A',
      urai: 'Deserunt dolore aliqua dolore exercitation incididunt duis esse anim adipisicing.',
    },
    {
      label: 'B',
      urai: 'Commodo et ullamco ipsum dolore non dolor velit nulla laborum.',
    },
    {
      label: 'C',
      urai: 'Officia ad nostrud velit minim est ex velit nulla velit consequat.',
    },
    { label: 'D', urai: 'Qui cupidatat ad deserunt incididunt.' },
    {
      label: 'E',
      urai: 'Minim magna laborum non duis esse nisi excepteur labore non quis eiusmod fugiat.',
    },
  ];
  // Store the selected options as an array
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option.label)) {
      // If the option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((o) => o !== option.label));
    } else if (selectedOptions.length < 1) {
      // If less than two options are selected, add the new option
      setSelectedOptions([...selectedOptions, option.label]);
    } else {
      // Optional: Display an alert or notification when the limit is reached
      alert('You can only select up to two options.');
    }
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Function to increment the counter
    const incrementCounter = () => {
      setCounter((prevCounter) => prevCounter + 1);
    };

    // Set up a timer to call incrementCounter every second
    const intervalId = setInterval(incrementCounter, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Menangani perubahan animasi slide (naik atau turun)

  //console.log(webViewHeight);
  const images = [
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/1024px-Koala_climbing_tree.jpg',
    },
  ];
  return (
    <Board>
      <Box zIndex={23}>
        <HStack
          p={4}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={colors.primary}
        >
          <HStack alignItems={'center'}>
            <Pressable pr={3} onPress={() => navigation.goBack()}>
              <Icon
                color={'white'}
                size={8}
                name="chevron-back"
                as={Ionicons}
              />
            </Pressable>

            <Cext ml={2} bold fontSize={16} color={'white'}>
              {tit}
            </Cext>
          </HStack>

          <HStack alignSelf={'flex-end'} space={2} m={2}>
            <Pressable>
              <Box bg={'white'} shadow={3} p={2} borderRadius={'md'}>
                <Icon as={Ionicons} name="text" />
              </Box>
            </Pressable>
          </HStack>
        </HStack>
      </Box>

      <Box flex={1}>
        <EnhancedImageViewing
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
        <ScrollView style={{ flexGrow: 1 }}>
          <Box px={4}>
            <Stack space={2}>
              <Box
                bg={colors.accent}
                p={1}
                borderRadius={'2xl'}
                w={100}
                alignSelf={'center'}
                mt={4}
              >
                <Cext
                  color={'white'}
                  bold
                  alignSelf={'center'}
                  fontSize={17}
                  borderRadius={'lg'}
                >
                  {timeLeft}
                </Cext>
              </Box>
              <Text alignSelf={'center'} fontSize={10}>
                {counter} second
              </Text>
              <Pressable onPress={() => setVisible(true)}>
                <Box bg={colors.box} borderRadius={'lg'} overflow={'hidden'}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/1024px-Koala_climbing_tree.jpg',
                    }}
                    w={'full'}
                    h={320}
                    alt=""
                  />
                </Box>
              </Pressable>
              <Divider />
              <HStack justifyContent={'space-between'}>
                {options.map((v, i) => (
                  <Pressable
                    key={i}
                    p={2}
                    bg={
                      selectedOptions.includes(v.label)
                        ? colors.primary
                        : colors.box
                    }
                    shadow={3}
                    borderRadius={'lg'}
                    onPress={() => handleOptionPress(v)}
                    borderWidth={selectedOptions.includes(v.label) ? 1.8 : 0}
                    borderColor={colors.primary}
                  >
                    <Center alignItems={'center'} w={10} h={10}>
                      <Cext
                        bold
                        fontSize={22}
                        color={
                          selectedOptions.includes(v.label)
                            ? 'white'
                            : colors.textLight
                        }
                      >
                        {v.label}
                      </Cext>
                    </Center>
                  </Pressable>
                ))}
              </HStack>
              <HStack flex={1} space={2} mt={4}>
                <Pressable
                  onPress={() => navigation.navigate('Summary')}
                  flex={1}
                >
                  <HStack
                    bg={adjustColor(colors.accent, -15)}
                    alignItems={'center'}
                    justifyContent={'center'}
                    py={2}
                    shadow={3}
                    mb={3}
                    borderRadius={'lg'}
                  >
                    <Icon
                      mr={2}
                      as={Ionicons}
                      name="arrow-back-circle"
                      color={'white'}
                    />
                    <Cext color={'white'}>Sebelumnya</Cext>
                  </HStack>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('Summary')}
                  flex={1}
                >
                  <HStack
                    bg={colors.accent}
                    alignItems={'center'}
                    justifyContent={'center'}
                    py={2}
                    shadow={3}
                    mb={3}
                    borderRadius={'lg'}
                  >
                    <Cext color={'white'}>Berikutnya</Cext>
                    <Icon
                      ml={2}
                      as={Ionicons}
                      name="arrow-forward-circle"
                      color={'white'}
                    />
                  </HStack>
                </Pressable>
              </HStack>
            </Stack>
          </Box>
        </ScrollView>
        <Box
          bg={colors.box}
          p={2}
          borderTopWidth={3}
          borderColor={colors.primary}
          borderTopRadius={6}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {page.map((v, i) => (
              <Pressable key={i} mr={2}>
                <Center
                  bg={i <= 4 ? colors.primary : colors.box}
                  w={i === 4 ? 12 : 8}
                  h={i === 4 ? 12 : 8}
                  borderRadius={'lg'}
                  borderWidth={i === 4 ? 6 : 1}
                  borderColor={colors.primary}
                >
                  <Cext
                    color={i <= 4 ? colors.textDark : colors.textLight}
                    fontSize={i === 4 ? 16 : 10}
                    bold={i === 4 ? true : false}
                  >
                    {i + 1}
                  </Cext>
                </Center>
              </Pressable>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </Board>
  );
};
export default DetailLatihangambar;
