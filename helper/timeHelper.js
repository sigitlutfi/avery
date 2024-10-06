import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const parseTimeLeft = (timeLeft) => {
  const [minutes, seconds] = timeLeft.split(':').map(Number);
  return minutes * 60 + seconds;
};

const formatTimeLeft = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const useCountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Initialize with 0
  const [appState, setAppState] = useState(AppState.currentState);

  // Load the initial time left from SecureStore
  useEffect(() => {
    const loadTimeLeft = async () => {
      const savedTime = await SecureStore.getItemAsync('timeLeft');
      if (savedTime) {
        setTimeLeft(parseTimeLeft(savedTime));
      }
    };

    loadTimeLeft();
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const savedTime = await SecureStore.getItemAsync('timeLeft');
        if (savedTime) {
          setTimeLeft(parseTimeLeft(savedTime));
        }
      } else if (nextAppState.match(/inactive|background/)) {
        await SecureStore.setItemAsync('timeLeft', formatTimeLeft(timeLeft));
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState, timeLeft]);

  // Save the time left when it changes
  useEffect(() => {
    const saveTimeLeft = async () => {
      await SecureStore.setItemAsync('timeLeft', formatTimeLeft(timeLeft));
    };

    saveTimeLeft();
  }, [timeLeft]);

  return {
    timeLeft: formatTimeLeft(timeLeft),
  };
};
