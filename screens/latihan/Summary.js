import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {
  Box,
  Center,
  Circle,
  HStack,
  Icon,
  Modal,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, { useContext, useState } from 'react';
import PieChart from 'react-native-pie-chart';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import { ColorContext } from '../../contexts/ColorContext';

const Summary = ({ navigation }) => {
  const { colors } = useContext(ColorContext);
  const [showModal, setShowModal] = useState(true);

  const widthAndHeight = 250;
  const series = [123, 321, 188];
  const [Percobaan, _setPercobaan] = useState([{}, {}, {}, {}]);

  const sliceColor = [colors.green, colors.purple, '#ff3c00'];

  return (
    <Board>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" bg={colors.primary}>
          <Modal.CloseButton _icon={{ color: 'white' }} />

          <Modal.Body>
            <Center>
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/images/congrat.json')}
              />
              <Cext color="white" black fontSize={20} mb={2}>
                Yeayyy....
              </Cext>
              <Cext color="white" fontSize={16} textAlign="justify">
                Kamu telah berhasil menyelesaikan latihan. Semangat terus untuk
                belajar dan tingkatkan skormu.
              </Cext>
              <Cext color="white" mt={12}>
                our teams
              </Cext>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Stack alignItems={'center'} flex={1}>
        <Box bg={colors.primary} pb={6} w={'full'} alignItems={'center'}>
          <Cext bold fontSize={20} mt={4} mb={-2} color={'white'}>
            HASIL LATIHAN
          </Cext>
          <HStack alignItems={'center'} space={2}>
            <Cext color={colors.primary}>POIN</Cext>
            <Text bold fontSize={56} color={'white'}>
              90
            </Text>
            <Cext color={'white'}>POIN</Cext>
          </HStack>
        </Box>
        <Box
          h={6}
          bg={colors.bg}
          mt={-6}
          w={'full'}
          borderTopRadius={'2xl'}
        ></Box>
        <ScrollView w={'full'} contentContainerStyle={{ alignItems: 'center' }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.7}
            coverFill={colors.bg}
          />
          <Box w={'full'} p={4}>
            {sliceColor.map((v, i) => (
              <HStack key={i} alignItems={'center'} space={2}>
                <Circle w={4} h={4} bg={v} />
                <Cext>Summary detail {series[i]}</Cext>
              </HStack>
            ))}
          </Box>

          <Box w={'100%'} p={4} mx={4}>
            <HStack
              bg={colors.box}
              p={2}
              justifyContent={'space-between'}
              borderRadius={'lg'}
            >
              <Cext bold w={4}>
                #
              </Cext>
              <Cext bold w={20}>
                Percobaan
              </Cext>
              <Cext bold w={20}>
                Waktu
              </Cext>
              <Cext bold w={20}>
                Poin
              </Cext>
            </HStack>
            {Percobaan.map((color, index) => (
              <HStack
                key={index} // Unique key for each row
                p={2}
                justifyContent={'space-between'}
                borderColor={colors.accent}
                borderRadius={'xl'}
                borderWidth={index === 3 ? 1 : 0} // Corrected condition
                // Dynamic background color
              >
                <Cext w={4}>{index + 1}</Cext>
                <Cext w={20}>Percobaan {index + 1}</Cext>
                <Cext w={20}>12:04</Cext>
                <Cext w={20}>90</Cext>
              </HStack>
            ))}
          </Box>
        </ScrollView>
        <HStack space={4} px={4} py={4}>
          <Pressable
            bg={colors.accent}
            flex={1}
            p={3}
            borderRadius={'xl'}
            onPress={() => navigation.goBack()}
          >
            <HStack space={2} justifyContent={'center'}>
              <Icon as={Ionicons} name="refresh" size={5} color="white" />
              <Cext bold fontSize={16} color="white">
                COBA LAGI
              </Cext>
            </HStack>
          </Pressable>
          <Pressable
            bg={colors.green}
            flex={1}
            p={3}
            borderRadius={'xl'}
            onPress={() => navigation.navigate('KunciJawaban')}
          >
            <HStack justifyContent={'center'}>
              <Cext bold fontSize={16} color="white">
                KUNCI JAWABAN
              </Cext>
              <Icon as={Ionicons} name="arrow-forward" size={5} color="white" />
            </HStack>
          </Pressable>
        </HStack>
      </Stack>
    </Board>
  );
};

export default Summary;
