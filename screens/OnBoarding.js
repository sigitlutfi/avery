import { Box, Center, HStack, Image } from 'native-base';
import React, { useContext, useState } from 'react';
import PagerView from 'react-native-pager-view';

import Board from '../components/Board';
import Cext from '../components/Cext';
import Cutton from '../components/Cutton';
import { AuthContext } from '../contexts/AuthContext';
import { ColorContext } from '../contexts/ColorContext';
import { ConfigContext } from '../contexts/ConfigContext';

const OnboardingScreen = () => {
  const { colors } = useContext(ColorContext);
  const { config } = useContext(ConfigContext);
  const { reOnBoarding } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);

  // Sample onboarding data
  const onboardingData = [
    {
      image: require('../assets/images/maskc.png'),
      title: 'Welcome',
      desc: 'Welcome to our amazing app.',
    },
    {
      image: require('../assets/images/mask.png'),
      title: 'Track your progress',
      desc: 'Keep track of your daily activities.',
    },
    {
      image: require('../assets/images/maskb.png'),
      title: 'Stay motivated',
      desc: 'Get reminders to keep you on track.',
    },
  ];

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleGetStart = async () => {
    reOnBoarding({ type: 'off' });
  };

  const isLastPage = currentPage === onboardingData.length - 1;

  return (
    <Board statusBarColor={colors.bg} statusBarStyle={'light'}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {onboardingData.map((item, index) => (
          <Box
            key={index}
            p={5}
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              source={config.icon}
              alt="Onboarding Image"
              size="xl"
              resizeMode="contain"
              mb={2}
              borderRadius={10}
            />
            <Cext bold fontSize={16}>
              {config.name_app}
            </Cext>
            <Cext mb={8}>{config.subname_app}</Cext>
            <Image
              source={item.image}
              alt="Onboarding Image"
              size="2xl"
              mb={5}
              resizeMode="contain"
              borderRadius={10}
            />
            <Cext fontSize={18} bold mb={3}>
              {item.title}
            </Cext>
            <Cext fontSize={14} bold mb={3}>
              {item.desc}
            </Cext>

            {/* Indicator below description */}
            <HStack justifyContent="center" mt={4}>
              {onboardingData.map((_, dotIndex) => (
                <Box
                  key={dotIndex}
                  size={3}
                  mx={1}
                  bg={
                    currentPage === dotIndex ? colors.primary : colors.lightgray
                  }
                  borderRadius="full"
                />
              ))}
            </HStack>
            {/* Button on last page */}
            {isLastPage && (
              <Center mt={6}>
                <Cutton
                  bg={colors.accent}
                  onPress={() => {
                    handleGetStart();
                  }}
                >
                  <Cext fontSize={20} bold color={'white'}>
                    Yuk Mulai
                  </Cext>
                </Cutton>
              </Center>
            )}
          </Box>
        ))}
      </PagerView>
    </Board>
  );
};

export default OnboardingScreen;
