import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';

import MyCustomTabBar from './components/navigation/MyTab';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { ColorPaletteProvider } from './contexts/ColorContext';
import { ConfigContext, ConfigProvider } from './contexts/ConfigContext';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Belajar from './screens/belajar/Belajar';
import DetailBelajar from './screens/belajar/DetailBelajar';
import Subkategori from './screens/belajar/Subkategori';
import Error from './screens/Error';
import Help from './screens/home/Help';
import Home from './screens/home/Home';
import Notification from './screens/home/Notification';
import DetailLatihan from './screens/latihan/DetailLatihan';
import DetailLatihangambar from './screens/latihan/DetailLatihangambar';
import KunciJawabanAgian from './screens/latihan/KunciJawabanAgian';
import Latihan from './screens/latihan/Latihan';
import Summary from './screens/latihan/Summary';
import OnboardingScreen from './screens/OnBoarding';
import Cekot from './screens/paket/Cekot';
import Keranjang from './screens/paket/Keranjang';
import Paket from './screens/paket/Paket';
import Voucher from './screens/paket/Voucher';
import Preexam from './screens/Preexam';
import EditProfile from './screens/profile/EditProfile';
import Profile from './screens/profile/Profile';
import Setting from './screens/profile/Setting';
import Splash from './screens/Splash';
import Tryout from './screens/tryout/Tryout';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackBelajar = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Belajar" component={Belajar} />
    <Stack.Screen name="SubKategoriBelajar" component={Subkategori} />
    <Stack.Screen name="DetailBelajar" component={DetailBelajar} />
  </Stack.Navigator>
);

const StackLatihan = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Latihan" component={Latihan} />
  </Stack.Navigator>
);

const StackHome = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const BottomTab = () => (
  <Tab.Navigator
    tabBar={(props) => <MyCustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="StackHome"
      component={StackHome}
      options={{ tabBarLabel: 'Home' }}
      initialParams={{ icon: 'home' }}
    />
    <Tab.Screen
      name="StackBelajar"
      component={StackBelajar}
      options={{ tabBarLabel: 'Belajar' }}
      initialParams={{ icon: 'book-sharp' }}
    />
    <Tab.Screen
      name="StackLatihan"
      component={StackLatihan}
      options={{ tabBarLabel: 'Latihan' }}
      initialParams={{ icon: 'document' }}
    />
    <Tab.Screen
      name="Try Out"
      component={Tryout}
      initialParams={{ icon: 'documents' }}
    />
    <Tab.Screen
      name="Paket"
      component={Paket}
      initialParams={{ icon: 'basket' }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStack" component={BottomTab} />
    <Stack.Screen name="Notification" component={Notification} />
    <Stack.Screen name="Preexam" component={Preexam} />
    <Stack.Screen name="DetailLatihan" component={DetailLatihan} />
    <Stack.Screen name="DetailLatihangambar" component={DetailLatihangambar} />
    <Stack.Screen name="Summary" component={Summary} />
    <Stack.Screen name="KunciJawaban" component={KunciJawabanAgian} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Setting" component={Setting} />
    <Stack.Screen name="Keranjang" component={Keranjang} />
    <Stack.Screen name="Voucher" component={Voucher} />
    <Stack.Screen name="Cekot" component={Cekot} />
    <Stack.Screen name="Help" component={Help} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const OnBoardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const App = () => {
  const { authState } = useContext(AuthContext);

  const { isConfigLoading, error, errorPage } = useContext(ConfigContext);

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);
  }, []);

  useEffect(() => {
    // Only hide splash screen when fonts are loaded and loading state is done
    if (authState.isLoading || isConfigLoading) {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, [isConfigLoading, authState.isLoading]);

  console.log(
    'Error: ' +
      error +
      ' / Auth Loading: ' +
      authState.isLoading +
      ' / Config Loading: ' +
      isConfigLoading
  );

  if (showSplash) {
    // Show splash screen when loading
    return <Splash />;
  }

  console.log('Show Splash: ' + showSplash);

  if (error && !showSplash && errorPage) {
    // Show error screen if there's an error and debug mode is enabled, and splash is finished
    return <Error error={error} />;
  }

  return (
    <NavigationContainer>
      {authState.isOnboardingCompleted ? (
        authState.userToken === null ? (
          <AuthStack />
        ) : (
          <AppStack />
        )
      ) : (
        <OnBoardingStack />
      )}
    </NavigationContainer>
  );
};

const AppContainer = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ColorPaletteProvider>
          <NativeBaseProvider>
            <App />
          </NativeBaseProvider>
        </ColorPaletteProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default AppContainer;
